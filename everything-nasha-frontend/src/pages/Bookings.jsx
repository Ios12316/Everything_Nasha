import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/axios.js";
import Footer from "../components/Footer.jsx";

const serviceCosts = {
    "Tattoo": "",
    "Nails.Stick On Gel Polish": 9000,
    "Nails.Gel Polish": 3000,
    "Nails.Toe Acrylic": 6000,
    "Nails.Plain Acrylic Set": 11000,
    "Nails.Short Acrylic": 10000,
    "Nails.Medium Acrylic": 15000,
    "Nails.Long Acrylic": 20000,
    "Nails.Refill and Gel Polish": 8000,
    "Nails.Airbrush Set (Long)": 25000,
    "Nails.Airbrush Set (Short)": 15000,
    "Nails.Soak Off": 2000,
    "Nails.Basic Pedicure (with Gel Polish)": 10000,
    "Nails.Basic Manicure (with Gel Polish)": 7000,
    "Lash.Classic": 15000,
    "Lash.Hybrid": 20000,
    "Lash.Volume": 28000,
    "Lash.Full Volume": 30000,
    "Lash.Mega Volume": 35000,
    "Lash.Under Eyes (₦5,000)": 5000,
    "Lash.Under Eyes (₦10,000)": 10000,
    "Lash.Removal": 5000,
    "Lash.Wispy": 5000,
    "Lash.Custom Volume/Under Eyes (₦35,000)": 35000,
    "Lash.Custom Volume/Under Eyes (₦40,000)": 40000,
    "Lash.Custom Mega Volume/Under Eyes": 65000
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
    const [showLashOptions, setShowLashOptions] = useState(false);
    const [showNailOptions, setShowNailOptions] = useState(false);

    const nailSubServices = {
        nailServices: [
            { key: "Nails.Stick On Gel Polish", label: "Stick On Gel Polish", price: 9000 },
            { key: "Nails.Gel Polish", label: "Gel Polish", price: 3000 },
            { key: "Nails.Toe Acrylic", label: "Toe Acrylic", price: 6000 },
            { key: "Nails.Plain Acrylic Set", label: "Plain Acrylic Set", price: 11000 },
            { key: "Nails.Short Acrylic", label: "Short Acrylic", price: 10000 },
            { key: "Nails.Medium Acrylic", label: "Medium Acrylic", price: 15000 },
            { key: "Nails.Long Acrylic", label: "Long Acrylic", price: 20000 },
            { key: "Nails.Refill and Gel Polish", label: "Refill and Gel Polish", price: 8000 },
            { key: "Nails.Airbrush Set (Long)", label: "Airbrush Set (Long)", price: 25000 },
            { key: "Nails.Airbrush Set (Short)", label: "Airbrush Set (Short)", price: 15000 },
            { key: "Nails.Soak Off", label: "Soak Off", price: 2000 }
        ],
        additional: [
            { key: "Nails.Basic Pedicure (with Gel Polish)", label: "Basic Pedicure (with Gel Polish)", price: 10000 },
            { key: "Nails.Basic Manicure (with Gel Polish)", label: "Basic Manicure (with Gel Polish)", price: 7000 }
        ]
    };

    const lashSubServices = {
        normal: [
            { key: "Lash.Classic", label: "Classic", price: 15000 },
            { key: "Lash.Hybrid", label: "Hybrid", price: 20000 },
            { key: "Lash.Volume", label: "Volume", price: 28000 },
            { key: "Lash.Full Volume", label: "Full Volume", price: 30000 },
            { key: "Lash.Mega Volume", label: "Mega Volume", price: 35000 },
            { key: "Lash.Under Eyes (₦5,000)", label: "Under Eyes (₦5,000)", price: 5000 },
            { key: "Lash.Under Eyes (₦10,000)", label: "Under Eyes (₦10,000)", price: 10000 },
            { key: "Lash.Removal", label: "Lash Removal", price: 5000 },
            { key: "Lash.Wispy", label: "Wispy", price: 5000 }
        ],
        custom: [
            { key: "Lash.Custom Volume/Under Eyes (₦35,000)", label: "Volume/Under Eyes (₦35,000)", price: 35000 },
            { key: "Lash.Custom Volume/Under Eyes (₦40,000)", label: "Volume/Under Eyes (₦40,000)", price: 40000 },
            { key: "Lash.Custom Mega Volume/Under Eyes", label: "Mega Volume/Under Eyes", price: 65000 }
        ]
    };

    const handleSubServiceToggle = (subServiceKey) => {
        setFormData(prev => {
            const services = prev.services.includes(subServiceKey)
                ? prev.services.filter(s => s !== subServiceKey)
                : [...prev.services, subServiceKey];
            return { ...prev, services };
        });
    };
    
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
                                                    <span className="font-semibold">
                                                        {s === "Tattoo" ? "Custom Pricing" : `₦${serviceCosts[s]?.toLocaleString()}`}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-slate-700 pt-4 flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white border-dashed">
                                        <span>Total Price:</span>
                                        <span className="text-emerald-600 dark:text-emerald-400">
                                            {formData.services.includes("Tattoo") 
                                                ? (totalCost > 0 ? `₦${totalCost.toLocaleString()} + Custom Pricing` : "Custom Pricing") 
                                                : `₦${totalCost.toLocaleString()}`}
                                        </span>
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
                                            {["Tattoo", "Nail Fixing", "Lash Extensions"].map(option => {
                                                const isLash = option === "Lash Extensions";
                                                const isNail = option === "Nail Fixing";
                                                
                                                const isLashSelected = formData.services.some(s => s.startsWith("Lash."));
                                                const selectedLashCount = formData.services.filter(s => s.startsWith("Lash.")).length;
                                                
                                                const isNailSelected = formData.services.some(s => s.startsWith("Nails."));
                                                const selectedNailCount = formData.services.filter(s => s.startsWith("Nails.")).length;

                                                const isSelected = isLash 
                                                    ? isLashSelected 
                                                    : isNail 
                                                    ? isNailSelected 
                                                    : formData.services.includes(option);
                                                
                                                const displayPrice = option === "Tattoo" 
                                                    ? "Custom Pricing" 
                                                    : isNail 
                                                    ? "₦2,000 - ₦25,000" 
                                                    : "₦5,000 - ₦65,000";

                                                return (
                                                    <motion.button
                                                        key={option}
                                                        type="button"
                                                        whileTap={{ scale: 0.96 }}
                                                        onClick={() => {
                                                            if (isLash) {
                                                                setShowLashOptions(!showLashOptions);
                                                            } else if (isNail) {
                                                                setShowNailOptions(!showNailOptions);
                                                            } else {
                                                                handleServiceToggle(option);
                                                            }
                                                        }}
                                                        className={`p-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 text-center cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                                            isSelected 
                                                            ? "border-black dark:border-pink-500 bg-black dark:bg-pink-600 text-white shadow-sm" 
                                                            : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700"
                                                        }`}
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            {option}
                                                            {isLash && selectedLashCount > 0 && (
                                                                <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                                                                    {selectedLashCount}
                                                                </span>
                                                            )}
                                                            {isNail && selectedNailCount > 0 && (
                                                                <span className="bg-pink-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                                                                    {selectedNailCount}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className={`text-xs font-medium ${isSelected ? "text-gray-350 dark:text-pink-200" : "text-gray-500 dark:text-gray-400"}`}>
                                                            {displayPrice}
                                                        </span>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>

                                        <AnimatePresence>
                                            {(showNailOptions || formData.services.some(s => s.startsWith("Nails."))) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden border border-pink-100/50 dark:border-slate-700/60 rounded-2xl bg-pink-50/10 dark:bg-slate-800/20 p-5 mt-4 space-y-5"
                                                >
                                                    <div className="flex justify-between items-center pb-2 border-b border-pink-100/30 dark:border-slate-700/60">
                                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Nail Services Options</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Select one or more (dot selection)</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Nail Services */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-3">Nail Services</h4>
                                                            <div className="space-y-2">
                                                                {nailSubServices.nailServices.map(service => {
                                                                    const isSubSelected = formData.services.includes(service.key);
                                                                    return (
                                                                        <button
                                                                            key={service.key}
                                                                            type="button"
                                                                            onClick={() => handleSubServiceToggle(service.key)}
                                                                            className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-left transition-all hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                                    isSubSelected 
                                                                                    ? "border-pink-600 dark:border-pink-500 bg-pink-600 dark:bg-pink-500" 
                                                                                    : "border-gray-300 dark:border-slate-650"
                                                                                }`}>
                                                                                    {isSubSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                                </div>
                                                                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{service.label}</span>
                                                                            </div>
                                                                            <span className="text-xs font-bold text-gray-900 dark:text-white">₦{service.price.toLocaleString()}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Additional Services */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-3">Additional Services</h4>
                                                            <div className="space-y-2">
                                                                {nailSubServices.additional.map(service => {
                                                                    const isSubSelected = formData.services.includes(service.key);
                                                                    return (
                                                                        <button
                                                                            key={service.key}
                                                                            type="button"
                                                                            onClick={() => handleSubServiceToggle(service.key)}
                                                                            className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-left transition-all hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                                    isSubSelected 
                                                                                    ? "border-pink-600 dark:border-pink-500 bg-pink-600 dark:bg-pink-500" 
                                                                                    : "border-gray-300 dark:border-slate-650"
                                                                                }`}>
                                                                                    {isSubSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                                </div>
                                                                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{service.label}</span>
                                                                            </div>
                                                                            <span className="text-xs font-bold text-gray-900 dark:text-white">₦{service.price.toLocaleString()}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <AnimatePresence>
                                            {(showLashOptions || formData.services.some(s => s.startsWith("Lash."))) && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden border border-pink-100/50 dark:border-slate-700/60 rounded-2xl bg-pink-50/10 dark:bg-slate-800/20 p-5 mt-4 space-y-5"
                                                >
                                                    <div className="flex justify-between items-center pb-2 border-b border-pink-100/30 dark:border-slate-700/60">
                                                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Lash Extensions Options</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">Select one or more (dot selection)</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Normal Set */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-3">Normal Set</h4>
                                                            <div className="space-y-2">
                                                                {lashSubServices.normal.map(service => {
                                                                    const isSubSelected = formData.services.includes(service.key);
                                                                    return (
                                                                        <button
                                                                            key={service.key}
                                                                            type="button"
                                                                            onClick={() => handleSubServiceToggle(service.key)}
                                                                            className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-left transition-all hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                                    isSubSelected 
                                                                                    ? "border-pink-600 dark:border-pink-500 bg-pink-600 dark:bg-pink-500" 
                                                                                    : "border-gray-300 dark:border-slate-650"
                                                                                }`}>
                                                                                    {isSubSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                                </div>
                                                                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{service.label}</span>
                                                                            </div>
                                                                            <span className="text-xs font-bold text-gray-900 dark:text-white">₦{service.price.toLocaleString()}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>

                                                        {/* Custom Set */}
                                                        <div>
                                                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-3">Custom Set</h4>
                                                            <div className="space-y-2">
                                                                {lashSubServices.custom.map(service => {
                                                                    const isSubSelected = formData.services.includes(service.key);
                                                                    return (
                                                                        <button
                                                                            key={service.key}
                                                                            type="button"
                                                                            onClick={() => handleSubServiceToggle(service.key)}
                                                                            className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-150 dark:border-slate-800/80 bg-white dark:bg-slate-900 text-left transition-all hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer"
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <div className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                                                    isSubSelected 
                                                                                    ? "border-pink-600 dark:border-pink-500 bg-pink-600 dark:bg-pink-500" 
                                                                                    : "border-gray-300 dark:border-slate-650"
                                                                                }`}>
                                                                                    {isSubSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                                                </div>
                                                                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{service.label}</span>
                                                                            </div>
                                                                            <span className="text-xs font-bold text-gray-900 dark:text-white">₦{service.price.toLocaleString()}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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
