import express from "express";
import Gallery from "../models/galleryModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all gallery items
router.get("/", async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add new gallery item (Admin Only!)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { url, type, caption } = req.body;
        if (!url || !type) {
            return res.status(400).json({ success: false, message: "URL and Type are required" });
        }

        const newItem = new Gallery({
            url,
            type,
            caption
        });

        await newItem.save();
        res.status(201).json({ success: true, message: "Item added to gallery successfully!", item: newItem });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a gallery item (Admin Only!)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Gallery.findById(id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        await Gallery.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Item deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
