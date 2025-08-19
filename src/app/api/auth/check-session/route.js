import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const user = await getSession();
    
    if (!user) {
      return NextResponse.json(
        { message: 'No active session' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { message: 'Error checking session' },
      { status: 500 }
    );
  }
} 