import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';
import Product from '@/model/Product';

export async function POST(request) {
  try {
    await dbConnect();
    const { userId, productId } = await request.json();

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Update viewedProducts
    const existingView = user.viewedProducts.find(
      view => view.product.toString() === productId
    );

    if (existingView) {
      existingView.viewCount += 1;
      existingView.lastViewed = new Date();
    } else {
      user.viewedProducts.push({
        product: productId,
        viewCount: 1,
        lastViewed: new Date()
      });
    }

    await user.save();

    return NextResponse.json(
      { message: 'Product view recorded successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error recording product view:', error);
    return NextResponse.json(
      { message: 'Error recording product view' },
      { status: 500 }
    );
  }
} 