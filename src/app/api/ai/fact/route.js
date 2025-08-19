import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { productName } = await request.json();
    
    if (!productName) {
      return NextResponse.json(
        { message: 'Product name is required' },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Generate a random fact
    const prompt = `Generate a short, interesting, and educational fact about ${productName}. Keep it under 100 characters and make it engaging.`;
    
    const result = await model.generateContent(prompt);
    const fact = result.response.text();

    return NextResponse.json({ fact });
  } catch (error) {
    console.error('Error generating fact:', error);
    return NextResponse.json(
      { message: 'Error generating fact', error: error.message },
      { status: 500 }
    );
  }
} 