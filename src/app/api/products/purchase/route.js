import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import User from '@/model/User';
import Product from '@/model/Product';

export async function POST(request) {
  try {
    await dbConnect();
    const { userId, productId, quantity } = await request.json();

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

    // Update purchasedProducts
    const existingPurchase = user.purchasedProducts.find(
      purchase => purchase.product.toString() === productId
    );

    if (existingPurchase) {
      existingPurchase.purchaseCount += quantity;
      existingPurchase.lastPurchased = new Date();
    } else {
      user.purchasedProducts.push({
        product: productId,
        purchaseCount: quantity,
        lastPurchased: new Date()
      });
    }

    // Update product stock
    product.stock -= quantity;
    if (product.stock < 0) {
      return NextResponse.json(
        { message: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Save both user and product
    await Promise.all([user.save(), product.save()]);

    return NextResponse.json(
      { message: 'Purchase recorded successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error recording purchase:', error);
    return NextResponse.json(
      { message: 'Error recording purchase' },
      { status: 500 }
    );
  }
} 