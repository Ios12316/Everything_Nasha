import express from "express";
import Message from "../models/messageModel.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a message (Public)
router.post("/", async (req, res) => {
    try {
        const { fullName, email, message } = req.body;
        if (!fullName || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMessage = new Message({
            fullName,
            email,
            message
        });

        await newMessage.save();
        res.status(201).json({ success: true, message: "Message sent successfully!", data: newMessage });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all messages (Admin Only!)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a message (Admin Only!)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const msg = await Message.findById(id);
        if (!msg) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }
        await Message.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Message deleted successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
