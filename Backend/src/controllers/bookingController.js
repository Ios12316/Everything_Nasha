import Booking from "../models/bookingModel.js";


export const createBooking = async (req, res) => {
    try{
        const { fullName, phoneNumber, service, date, time } = req.body;
        const booking = await Booking.create({
            fullName,
            phoneNumber,
            service,
            date,
            time,
        });
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    }
    catch(error) {
            res.status(400).json({
            success: false,
            message: "Failed to create booking",
            error: error.message,
        });
    }
}
export const getAllBookings = async (req, res) => {
    try{
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });
    }
    catch(error) {
            res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export const getBookingById = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        res.status(200).json({
            success: true,
            booking,
        });
    }
    catch(error) {
            res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export const updateBookingStatus = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        booking.status = req.body.status;
        await booking.save();
    
        res.status(200).json({
            success: true,
            message: "Booking updated",
            booking,
        });
    }
    catch(error) {
            res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
export const deleteBooking = async (req, res) => {
    try{
        const booking = await Booking.findById(req.params.id);
        if(!booking){
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        await booking.deleteOne();
        res.status(200).json({
            success: true,
            message: "Booking deleted",
        });
    }
    catch(error) {
            res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}