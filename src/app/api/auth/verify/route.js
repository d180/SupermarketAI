import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';

export async function POST(request) {
  try {
    await dbConnect();
    const { email, verificationCode } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user is already verified
    if (user.isVerified) {
      return NextResponse.json(
        { message: 'User is already verified' },
        { status: 400 }
      );
    }

    // Verify the code
    if (user.verificationCode !== verificationCode) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationCode = undefined; // Remove the verification code after successful verification
    await user.save();

    return NextResponse.json(
      { message: 'Account verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Error verifying account' },
      { status: 500 }
    );
  }
} 