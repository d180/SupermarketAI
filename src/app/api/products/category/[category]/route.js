import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Product from '@/model/Product';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { category } = params;

    console.log('Fetching products for category:', category);

    const products = await Product.find({ 
      category: category.toLowerCase(),
      isAvailable: true 
    });

    console.log(`Found ${products.length} products for category ${category}`);

    if (!products || products.length === 0) {
      console.log('No products found for category:', category);
      return NextResponse.json([]);
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error fetching products', error: error.message },
      { status: 500 }
    );
  }
} 