import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    totalCost: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled","completed"],
        default: "pending",
    },
    
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

