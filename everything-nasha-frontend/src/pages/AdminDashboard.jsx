import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/axios.js";
import useModalStore from "../services/modalStore.js";

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50",
    completed: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/50",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900/50"
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const { showConfirm, showAlert } = useModalStore();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Gallery states
    const [galleryItems, setGalleryItems] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(true);
    const [uploadData, setUploadData] = useState({
        type: "image",
        caption: "",
        url: ""
    });
    const [fileBase64, setFileBase64] = useState("");
    const [uploading, setUploading] = useState(false);
    const [galleryMessage, setGalleryMessage] = useState({ text: "", isError: false });

    // Customer Messages states
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);

    // Reviews states
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    }

    const getTodayRevenue = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayStr = `${year}-${month}-${day}`;

        return bookings
            .filter(booking => booking.status === "completed" && booking.date === todayStr)
            .reduce((sum, booking) => sum + (booking.totalCost || 0), 0);
    }

    const getTotalRevenue = () => {
        return bookings
            .filter(booking => booking.status === "completed")
            .reduce((sum, booking) => sum + (booking.totalCost || 0), 0);
    }

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/bookings", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBookings(response.data.bookings);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchGallery = async () => {
        try {
            const res = await api.get("/gallery");
            if (res.data?.success) {
                setGalleryItems(res.data.items);
            }
        } catch (err) {
            console.error("Error loading gallery:", err);
        } finally {
            setGalleryLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api.get("/messages", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data?.success) {
                setMessages(response.data.messages);
            }
        } catch (err) {
            console.error("Error loading messages:", err);
        } finally {
            setMessagesLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            const res = await api.get("/reviews");
            if (res.data?.success) {
                setReviews(res.data.reviews);
            }
        } catch (err) {
            console.error("Error loading reviews:", err);
        } finally {
            setReviewsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fileType = file.type.startsWith("video/") ? "video" : "image";
        setUploadData(prev => ({ ...prev, type: fileType }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setFileBase64(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUploadSubmit = async (e) => {
        e.preventDefault();
        const targetUrl = fileBase64 || uploadData.url;

        if (!targetUrl) {
            setGalleryMessage({ text: "Please select a file or paste a URL", isError: true });
            return;
        }

        setUploading(true);
        setGalleryMessage({ text: "", isError: false });

        try {
            const token = localStorage.getItem("token");
            const res = await api.post("/gallery", {
                url: targetUrl,
                type: uploadData.type,
                caption: uploadData.caption
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data?.success) {
                setGalleryMessage({ text: "Media uploaded successfully!", isError: false });
                setUploadData({ type: "image", caption: "", url: "" });
                setFileBase64("");
                const fileInput = document.getElementById("gallery-file-input");
                if (fileInput) fileInput.value = "";
                fetchGallery();
            }
        } catch (err) {
            const errMsg = err.response?.data?.message || "Upload failed.";
            setGalleryMessage({ text: errMsg, isError: true });
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteGalleryItem = (id) => {
        showConfirm(
            "Delete Media",
            "Are you sure you want to permanently delete this gallery item?",
            async () => {
                try {
                    const token = localStorage.getItem("token");
                    const res = await api.delete(`/gallery/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.data?.success) {
                        fetchGallery();
                    }
                } catch (err) {
                    showAlert("Error", "Error deleting item.");
                }
            }
        );
    };

    const handleDeleteMessage = (id) => {
        showConfirm(
            "Delete Message",
            "Are you sure you want to permanently delete this customer message?",
            async () => {
                try {
                    const token = localStorage.getItem("token");
                    const res = await api.delete(`/messages/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.data?.success) {
                        fetchMessages();
                    }
                } catch (err) {
                    console.error(err);
                    showAlert("Error", "Failed to delete customer message.");
                }
            }
        );
    };

    const handleDeleteReview = (id) => {
        showConfirm(
            "Delete Review",
            "Are you sure you want to permanently delete this customer review?",
            async () => {
                try {
                    const token = localStorage.getItem("token");
                    const res = await api.delete(`/reviews/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res.data?.success) {
                        fetchReviews();
                    }
                } catch (err) {
                    console.error(err);
                    showAlert("Error", "Failed to delete review.");
                }
            }
        );
    };

    useEffect(() => {
        fetchBookings();
        fetchGallery();
        fetchMessages();
        fetchReviews();
    }, []);

    const updateBookingStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");
            await api.put(`/bookings/${id}`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchBookings();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBooking = (id) => {
        showConfirm(
            "Delete Booking",
            "Are you sure you want to permanently delete this booking?",
            async () => {
                try {
                    const token = localStorage.getItem("token");
                    await api.delete(`/bookings/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    fetchBookings();
                } catch (error) {
                    console.log(error);
                    showAlert("Error", "Failed to delete booking.");
                }
            }
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-12 border-4 border-black dark:border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Dashboard...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-4 md:p-10">
            <div className="max-w-6xl mx-auto animate-fadeIn">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight font-serif">Everything_Nasha</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Admin Appointment & Message Management</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Bookings", val: bookings.length, color: "text-gray-900 dark:text-white" },
                        { label: "Pending Bookings", val: bookings.filter(b => b.status === "pending").length, color: "text-amber-600 dark:text-amber-400" },
                        { label: "Customer Messages", val: messages.length, color: "text-purple-600 dark:text-purple-400" },
                        { label: "Total Completed Revenue", val: `₦${getTotalRevenue().toLocaleString()}`, color: "text-blue-600 dark:text-blue-400" }
                    ].map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm"
                        >
                            <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            <div className={`text-2xl font-bold mt-2 ${stat.color}`}>{stat.val}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Bookings Table Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm overflow-hidden"
                >
                    <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-serif">📅 Bookings Overview</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/75 dark:bg-slate-900/30 border-b border-gray-200 dark:border-slate-700 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    <th className="p-4 md:p-5">Customer</th>
                                    <th className="p-4 md:p-5">Services</th>
                                    <th className="p-4 md:p-5">Date & Time</th>
                                    <th className="p-4 md:p-5">Total Price</th>
                                    <th className="p-4 md:p-5">Status</th>
                                    <th className="p-4 md:p-5 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/60 text-sm">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-10 text-center text-gray-500 dark:text-gray-400">
                                            No appointments found.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/20 transition-colors">
                                            <td className="p-4 md:p-5">
                                                <div className="font-semibold text-gray-900 dark:text-white">{booking.fullName || "N/A"}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{booking.phoneNumber || "N/A"}</div>
                                            </td>

                                            <td className="p-4 md:p-5">
                                                <div className="flex flex-wrap gap-1">
                                                    {booking.services && booking.services.length > 0 ? (
                                                        booking.services.map((s, idx) => (
                                                            <span key={idx} className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs font-medium">
                                                                {s}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-2 py-0.5 rounded text-xs font-medium">
                                                            {booking.service || "N/A"}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="p-4 md:p-5">
                                                <div className="font-medium text-gray-800 dark:text-gray-200">{booking.date}</div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{booking.time}</div>
                                            </td>

                                            <td className="p-4 md:p-5 font-semibold text-gray-900 dark:text-white">
                                                ₦{booking.totalCost !== undefined ? booking.totalCost.toLocaleString() : "N/A"}
                                            </td>

                                            <td className="p-4 md:p-5">
                                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusStyles[booking.status] || "bg-gray-100 text-gray-800"}`}>
                                                    {(booking.status || "pending").toUpperCase()}
                                                </span>
                                            </td>

                                            <td className="p-4 md:p-5 text-right">
                                                <div className="flex justify-end gap-1.5 flex-wrap">
                                                    {booking.status === "pending" && (
                                                        <button
                                                            onClick={() => updateBookingStatus(booking._id, "approved")}
                                                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
                                                        >
                                                            Approve
                                                        </button>
                                                    )}
                                                    {booking.status === "approved" && (
                                                        <button
                                                            onClick={() => updateBookingStatus(booking._id, "completed")}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
                                                        >
                                                            Complete
                                                        </button>
                                                    )}
                                                    {booking.status !== "cancelled" && booking.status !== "completed" && (
                                                        <button
                                                            onClick={() => updateBookingStatus(booking._id, "cancelled")}
                                                            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer"
                                                        >
                                                            Cancel
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => deleteBooking(booking._id)}
                                                        className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-450 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Customer Messages Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm overflow-hidden mt-10"
                >
                    <div className="p-5 border-b border-gray-100 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-serif">📨 Customer Messages</h2>
                        <p className="text-xs text-gray-500 mt-1">Queries submitted via the Contact Us form.</p>
                    </div>

                    <div className="p-6">
                        {messagesLoading ? (
                            <p className="text-xs text-gray-500 text-center py-6">Loading messages...</p>
                        ) : messages.length === 0 ? (
                            <p className="text-xs text-gray-500 text-center py-6">No messages received yet.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {messages.map((msg) => (
                                    <div 
                                        key={msg._id} 
                                        className="relative p-5 rounded-2xl border border-gray-100 dark:border-slate-750 bg-gray-50/50 dark:bg-slate-900/30 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">{msg.fullName}</h3>
                                                    <p className="text-xs text-pink-500 dark:text-pink-400 font-medium break-all">{msg.email}</p>
                                                </div>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                                    {new Date(msg.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed whitespace-pre-wrap">
                                                "{msg.message}"
                                            </p>
                                        </div>

                                        <div className="mt-5 flex justify-end">
                                            <button
                                                onClick={() => handleDeleteMessage(msg._id)}
                                                className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-450 text-xs font-semibold py-1.5 px-3 rounded-lg cursor-pointer transition-colors"
                                            >
                                                Delete Message
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Reviews Management Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.38 }}
                    className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm overflow-hidden mt-10"
                >
                    <div className="p-5 border-b border-gray-100 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white font-serif">⭐ Customer Reviews</h2>
                        <p className="text-xs text-gray-500 mt-1">Moderate customer reviews shown on the homepage.</p>
                    </div>

                    <div className="p-6">
                        {reviewsLoading ? (
                            <p className="text-xs text-gray-500 text-center py-6">Loading reviews...</p>
                        ) : reviews.length === 0 ? (
                            <p className="text-xs text-gray-500 text-center py-6">No reviews received yet.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-4">
                                {reviews.map((rev) => (
                                    <div 
                                        key={rev._id} 
                                        className="relative p-5 rounded-2xl border border-gray-100 dark:border-slate-750 bg-gray-50/50 dark:bg-slate-900/30 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex justify-between items-start gap-4 mb-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 dark:text-white">{rev.fullName}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                                            {rev.service}
                                                        </span>
                                                        <div className="flex text-amber-500 text-xs">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                                    {new Date(rev.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                                                "{rev.comment}"
                                            </p>
                                        </div>

                                        <div className="mt-5 flex justify-end">
                                            <button
                                                onClick={() => handleDeleteReview(rev._id)}
                                                className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-450 text-xs font-semibold py-1.5 px-3 rounded-lg cursor-pointer transition-colors"
                                            >
                                                Delete Review
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Gallery Manager Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-10 grid lg:grid-cols-5 gap-8 items-start mb-16"
                >
                    {/* Left: Upload Form */}
                    <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-serif">💅 Add Gallery Media</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Upload recent work images/videos to be visible to customers on the public gallery.</p>

                        <AnimatePresence>
                            {galleryMessage.text && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-4 p-3 rounded-xl text-xs font-semibold text-center border ${
                                        galleryMessage.isError
                                            ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900/45"
                                            : "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/20 dark:text-green-300 dark:border-green-900/45"
                                    }`}
                                >
                                    {galleryMessage.text}
                                </motion.p>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleUploadSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Media Type</label>
                                    <select
                                        value={uploadData.type}
                                        onChange={(e) => setUploadData(prev => ({ ...prev, type: e.target.value }))}
                                        className="w-full border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Upload File</label>
                                    <input
                                        id="gallery-file-input"
                                        type="file"
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
                                        className="w-full border border-gray-200 dark:border-slate-700 p-2.5 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none cursor-pointer text-xs"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Or Paste Media URL</label>
                                <input
                                    type="text"
                                    placeholder="https://example.com/pic.jpg"
                                    value={uploadData.url}
                                    onChange={(e) => {
                                        setUploadData(prev => ({ ...prev, url: e.target.value }));
                                        setFileBase64("");
                                    }}
                                    className="w-full border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Caption</label>
                                <input
                                    type="text"
                                    placeholder="Nail sets description..."
                                    value={uploadData.caption}
                                    onChange={(e) => setUploadData(prev => ({ ...prev, caption: e.target.value }))}
                                    className="w-full border border-gray-200 dark:border-slate-700 p-3 rounded-xl bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-xs"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 text-xs text-center"
                            >
                                {uploading ? "Uploading..." : "Add to Gallery"}
                            </button>
                        </form>
                    </div>

                    {/* Right: List of Media items */}
                    <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm max-h-[520px] overflow-y-auto">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-serif">🖼️ Manage Gallery Media</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Current media items showing in the public gallery. Delete unwanted media.</p>

                        {galleryLoading ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-6">Loading gallery items...</p>
                        ) : galleryItems.length === 0 ? (
                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-6">No gallery items found.</p>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                {galleryItems.map((item) => (
                                    <div key={item._id} className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-gray-150 border border-gray-200 dark:border-slate-700 flex items-center justify-center">
                                        {item.type === "video" ? (
                                            <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                                        ) : (
                                            <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                                        )}
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 z-10">
                                            <p className="text-[10px] text-white font-medium line-clamp-2">{item.caption || "No Caption"}</p>
                                            <button
                                                onClick={() => handleDeleteGalleryItem(item._id)}
                                                className="bg-rose-600 text-white text-[10px] py-1.5 px-3 rounded-lg font-semibold hover:bg-rose-750 transition-colors w-fit cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}