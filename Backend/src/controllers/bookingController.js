import Booking from "../models/bookingModel.js";


export const createBooking = async (req, res) => {
    try{
        const { fullName, phoneNumber, services, date, time, totalCost } = req.body;

        // Phone number validation
        const validatePhone = (phone) => {
            if (!phone) return false;
            const trimmed = phone.trim();
            const cleanPhone = trimmed.replace(/\D/g, "");
            if (trimmed.startsWith("0")) {
                return cleanPhone.length === 11;
            }
            return cleanPhone.length >= 10 && cleanPhone.length <= 15;
        };

        if (!validatePhone(phoneNumber)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid phone number"
            });
        }

        // Date validation (must be present or future date)
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        if (date < todayStr) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid date"
            });
        }

        // Combine date and time to validate future times (allowing a 24h timezone buffer)
        const bookingDateTime = new Date(`${date}T${time}`);
        const gracePeriod = 24 * 60 * 60 * 1000; 

        if (isNaN(bookingDateTime.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid date and time"
            });
        }

        if (bookingDateTime.getTime() < today.getTime() - gracePeriod) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid date and time"
            });
        }

        const booking = await Booking.create({
            fullName,
            phoneNumber,
            services,
            date,
            time,
            totalCost,
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