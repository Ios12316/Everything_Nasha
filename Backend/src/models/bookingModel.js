import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    service: {
        type: String,
        required: true,
        enum: ["Tattoo", "Nails", "Lash Extension"]
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
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

