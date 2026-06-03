import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/axios.js";
import Footer from "../components/Footer.jsx";

const serviceCosts = {
    "Tattoo": 150,
    "Nails": 50,
    "Lash Extension": 80
};

const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getCurrentTimeString = () => {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
};

export default function Bookings() {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        services: [],
        date: "",
        time: "",
    });
    const [message, setMessage] = useState({ text: "", isError: false });
    const [isConfirming, setIsConfirming] = useState(false);
    
    const handleChange = (e) => {
        setFormData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    };

    const handleServiceToggle = (serviceName) => {
        setFormData(prev => {
            const services = prev.services.includes(serviceName)
                ? prev.services.filter(s => s !== serviceName)
                : [...prev.services, serviceName];
            return { ...prev, services };
        });
    };

    const handlePreSubmit = (e) => {
        e.preventDefault();
        if (formData.services.length === 0) {
            setMessage({
                text: "Please select at least one service.",
                isError: true
            });
            return;
        }

        const validatePhone = (phone) => {
            const trimmed = phone.trim();
            const cleanPhone = trimmed.replace(/\D/g, "");
            if (trimmed.startsWith("0")) {
                return cleanPhone.length === 11;
            }
            return cleanPhone.length >= 10 && cleanPhone.length <= 15;
        };

        if (!validatePhone(formData.phoneNumber)) {
            setMessage({
                text: "Please enter a valid phone number",
                isError: true
            });
            return;
        }

        const todayStr = getTodayDateString();
        if (formData.date < todayStr) {
            setMessage({
                text: "Please select a valid date",
                isError: true
            });
            return;
        }

        if (formData.date === todayStr) {
            const currentTimeStr = getCurrentTimeString();
            if (formData.time < currentTimeStr) {
                setMessage({
                    text: "Please select a valid time",
                    isError: true
                });
                return;
            }
        }

        setMessage({ text: "", isError: false });
        setIsConfirming(true);
    };

    const totalCost = formData.services.reduce((total, s) => total + (serviceCosts[s] || 0), 0);

    const handleActualSubmit = async () => {
        try {
            const response = await api.post("/bookings", {
                ...formData,
                totalCost
            });
            setMessage({
                text: response.data.message || "Booking created successfully!",
                isError: false
            });
            setFormData({
                fullName: "",
                phoneNumber: "",
                services: [],
                date: "",
                time: "",
            });
            setIsConfirming(false);
        } catch (error) {
            const errMsg = error.response?.data?.error 
                ? `${error.response.data.message} (${error.response.data.error})`
                : (error.response?.data?.message || "Booking failed! Please try again.");
            setMessage({
                text: errMsg,
                isError: true
            });
            setIsConfirming(false);
        }
    };

    return (
        <>
            <div className="min-h-[85vh] bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-4 flex flex-col justify-center items-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-2xl bg-white dark:bg-slate-800/40 p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-slate-800/80 shadow-xl"
                >
                    <AnimatePresence mode="wait">
                        {isConfirming ? (
                            <motion.div
                                key="confirm"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">Confirm Your Booking</h1>
                                
                                <div className="bg-gray-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700/60 rounded-2xl p-6 space-y-4 mb-6 shadow-sm">
                                    <h2 className="text-xl font-bold border-b pb-2 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-slate-700">Booking Summary</h2>
                                    
                                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Full Name:</span>
                                        <span>{formData.fullName}</span>

                                        <span className="font-semibold">Phone Number:</span>
                                        <span>{formData.phoneNumber}</span>

                                        <span className="font-semibold">Date:</span>
                                        <span>{formData.date}</span>

                                        <span className="font-semibold">Time:</span>
                                        <span>{formData.time}</span>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2">
                                        <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Selected Services:</span>
                                        <ul className="space-y-1 pl-4 list-disc text-sm text-gray-700 dark:text-gray-300">
                                            {formData.services.map(s => (
                                                <li key={s} className="flex justify-between">
                                                    <span>{s}</span>
                                                    <span className="font-semibold">${serviceCosts[s]}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-slate-700 pt-4 flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white border-dashed">
                                        <span>Total Price:</span>
                                        <span className="text-emerald-600 dark:text-emerald-400">${totalCost}</span>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleActualSubmit}
                                        className="flex-1 bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer text-center"
                                    >
                                        Proceed and Book
                                    </button>
                                    <button
                                        onClick={() => setIsConfirming(false)}
                                        className="flex-1 bg-white hover:bg-gray-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-slate-700 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer text-center"
                                    >
                                        Cancel / Go Back
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">Book Appointment</h1>
                                
                                <AnimatePresence>
                                    {message.text && (
                                        <motion.div 
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={`p-4 mb-6 rounded-xl text-sm font-semibold border transition-all duration-300 ${
                                                message.isError 
                                                ? "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50" 
                                                : "bg-green-50 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/50"
                                            }`}
                                        >
                                            {message.text}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handlePreSubmit} className="space-y-5">
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Full Name</label>
                                        <input 
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full border border-gray-200 dark:border-slate-700/80 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all" 
                                            required 
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Phone Number</label>
                                        <input 
                                            type="text"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="e.g. 08012345678"
                                            className="w-full border border-gray-200 dark:border-slate-700/80 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all" 
                                            required 
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Select Services (Multiple choice)</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {["Tattoo", "Nails", "Lash Extension"].map(option => {
                                                const isSelected = formData.services.includes(option);
                                                return (
                                                    <motion.button
                                                        key={option}
                                                        type="button"
                                                        whileTap={{ scale: 0.96 }}
                                                        onClick={() => handleServiceToggle(option)}
                                                        className={`p-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                                            isSelected 
                                                            ? "border-black dark:border-pink-500 bg-black dark:bg-pink-600 text-white shadow-sm" 
                                                            : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                                                        }`}
                                                    >
                                                        <span>{option}</span>
                                                        <span className={`text-xs font-medium ${isSelected ? "text-gray-300" : "text-gray-500 dark:text-gray-400"}`}>
                                                            ${serviceCosts[option]}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</label>
                                            <input 
                                                type="date"
                                                name="date"
                                                min={getTodayDateString()}
                                                value={formData.date}
                                                onChange={handleChange}
                                                className="w-full border border-gray-200 dark:border-slate-700/80 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all cursor-pointer" 
                                                required 
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Time</label>
                                            <input 
                                                type="time"
                                                name="time"
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full border border-gray-200 dark:border-slate-700/80 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all cursor-pointer" 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.01] mt-2"
                                    >
                                        Book Appointment
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}
