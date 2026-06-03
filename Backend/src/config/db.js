import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        // Enforce timeout options so it doesn't hang indefinitely
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        
        // Only exit the process in local development to avoid crashing Vercel functions
        if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
            process.exit(1);
        }
        throw error;
    }
}

export default connectDB;
