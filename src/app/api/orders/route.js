import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
  try {
    const { items } = await request.json();
    console.log('Received order items:', items);
    
    // Connect to MongoDB
    const { db , client} = await connectToDatabase();
    
    // Start a session for transaction
    const session = client.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Create order document
        const order = {
          items,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Insert order into database
        const result = await db.collection('orders').insertOne(order, { session });
        
        // Update product stock
        for (const item of items) {
          const result = await db.collection('products').updateOne(
            { _id: new ObjectId(item._id), stock: { $gte: item.quantity } },
            { 
              $inc: { stock: -item.quantity }
            },
            { session }
          );
          
          if (result.modifiedCount === 0) {
            throw new Error(`Product ${item._id} not found or stock update failed`);
          }
        }
      });
    } finally {
      await session.endSession();
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order processed successfully' 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to process order' 
      },
      { status: 500 }
    );
  }
} 