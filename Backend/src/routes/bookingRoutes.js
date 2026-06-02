import express from "express";
import { createBooking, getAllBookings, getBookingById, updateBookingStatus, deleteBooking } from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", createBooking);
router.get("/",authMiddleware, getAllBookings);
router.get("/:id",authMiddleware, getBookingById);
router.put("/:id",authMiddleware, updateBookingStatus);
router.delete("/:id",authMiddleware, deleteBooking);

export default router;