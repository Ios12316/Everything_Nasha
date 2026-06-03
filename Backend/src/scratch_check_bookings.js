// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import dns from "node:dns";

// dns.setDefaultResultOrder("ipv4first");
// try {
//     dns.setServers(["8.8.8.8", "1.1.1.1"]);
// } catch (e) {
//     console.warn("Could not set DNS servers", e);
// }

// dotenv.config();

// const bookingSchema = new mongoose.Schema({
//     fullName: String,
//     phoneNumber: String,
//     services: [String],
//     date: String,
//     time: String,
//     totalCost: Number,
//     status: String
// }, { timestamps: true });

// const Booking = mongoose.model("Booking", bookingSchema);

// async function run() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log("Connected to MongoDB!");
//         const bookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
//         console.log("Latest 5 bookings:");
//         console.log(JSON.stringify(bookings, null, 2));
//     } catch (error) {
//         console.error("Error:", error);
//     } finally {
//         await mongoose.disconnect();
//     }
// }

// run();
