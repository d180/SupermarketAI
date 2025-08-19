import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }]
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email or username already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Create new user
    const user = await User.create({
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      phone: body.phone,
      preference: body.preference,
      password: hashedPassword,
      verificationCode: body.verificationCode,
      isVerified: false
    });

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      { message: 'User created successfully', user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
} 