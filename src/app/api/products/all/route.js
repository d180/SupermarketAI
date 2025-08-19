import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Product from '@/model/Product';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get user preference from query params
    const { searchParams } = new URL(request.url);
    const preference = searchParams.get('preference');
    
    // Build query based on user preference
    let query = { isAvailable: true };
    if (preference === 'veg') {
      query.category = { $ne: 'meat' };
    } else if (preference === 'vegan') {
      query.category = { $nin: ['meat', 'dairy'] };
    }

    // Fetch all products that match the query
    const products = await Product.find(query)
      .lean() // Use lean() for better performance as we don't need Mongoose document features
      .sort({ category: 1 }); // Sort by category for consistent ordering

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    return NextResponse.json(productsByCategory);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error fetching products', error: error.message },
      { status: 500 }
    );
  }
} 