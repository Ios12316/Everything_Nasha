import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    service: {
        type: String,
        required: true,
        enum: ["Tattoo", "Nails", "Lash Extension", "General"]
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
