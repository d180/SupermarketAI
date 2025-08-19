import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';
import Product from '@/model/Product';
// Add these back later only if you actually create the files.
// import Order from '@/model/Order';
// import OrderItem from '@/model/OrderItem';
// import Recommendation from '@/model/Recommendation';

export async function GET() {
  try {
    await dbConnect();

    // Initialize indexes for the models you actually have:
    await Promise.all([
      User.init(),
      Product.init(),
      // Order.init(),
      // OrderItem.init(),
      // Recommendation.init(),
    ]);

    return NextResponse.json(
      { message: 'Database connected and schemas created successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database or create schemas.' },
      { status: 500 }
    );
  }
}

export async function POST() {
  // Same behavior as GET for now
  return GET();
}
