import { dbConnect } from "@/lib/dbConnect";
import User from '@/model/User';
import Product from '@/model/Product';
import Order from '@/model/Order';
import OrderItem from '@/model/OrderItem';
import Recommendation from '@/model/Recommendation';

// Handle GET requests
export async function GET(req, res) {
    try {
        // Establish MongoDB connection
        await dbConnect();

        // Ensure all models are created and indexes are initialized
        await User.init();
        await Product.init();
        await Order.init();
        await OrderItem.init();
        await Recommendation.init();

        res.status(200).json({ message: "Database connected and schemas created successfully!" });
    } catch (error) {
        console.error("Setup error:", error);
        res.status(500).json({ error: "Failed to connect to database or create schemas." });
    }
}

// Handle POST requests (you can modify it if needed)
export async function POST(req, res) {
    try {
        // Handle the POST logic, if applicable.
        // For now, it can perform the same function as GET or something else based on your need.
        await dbConnect();

        await User.init();
        await Product.init();
        await Order.init();
        await OrderItem.init();
        await Recommendation.init();

        res.status(200).json({ message: "Database connected and schemas created successfully!" });
    } catch (error) {
        console.error("Setup error:", error);
        res.status(500).json({ error: "Failed to connect to database or create schemas." });
    }
}
