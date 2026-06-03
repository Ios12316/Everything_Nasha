import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dns from "node:dns";

if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
    dns.setDefaultResultOrder("ipv4first");
    try {
        dns.setServers(["8.8.8.8", "1.1.1.1"]);
    } catch (e) {
        console.warn("Could not set DNS servers:", e.message);
    }
}

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://everything-nasha-care.vercel.app",
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

// Database Connection Middleware (ensures connection and passes CORS headers on database failure)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error("Database connection middleware error:", err.message);
        res.status(500).json({ success: false, message: "Database connection failed: " + err.message });
    }
});

app.use("/api/admin", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
    res.send("Everything Nasha API is running");
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});