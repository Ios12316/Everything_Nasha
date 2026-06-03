import express from "express";
import crypto from "crypto";
import Review from "../models/reviewModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create a review
router.post("/", async (req, res) => {
    try {
        const { fullName, rating, service, comment } = req.body;
        if (!fullName || !rating || !service || !comment) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        const token = crypto.randomUUID();
        const review = new Review({
            fullName,
            rating: Number(rating),
            service,
            comment,
            editToken: token
        });

        await review.save();
        res.status(201).json({ 
            success: true, 
            message: "Review submitted successfully!", 
            review,
            editToken: token // Send to frontend to save in localStorage
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Edit review comment (Customer Only, validated via editToken)
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { comment, editToken } = req.body;

        if (!comment || !editToken) {
            return res.status(400).json({ success: false, message: "Comment and editToken are required" });
        }

        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        // If the review doesn't have an editToken yet (legacy), generate and save one first, or match
        if (review.editToken && review.editToken !== editToken) {
            return res.status(403).json({ success: false, message: "Unauthorized to edit this review" });
        }

        review.comment = comment;
        await review.save();

        res.status(200).json({ success: true, message: "Review updated successfully!", review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete review (Admin Only!)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        await Review.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Review deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
