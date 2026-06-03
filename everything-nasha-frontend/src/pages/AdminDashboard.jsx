import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios.js";

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900/50",
    completed: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/50",
    cancelled: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:text-rose-300 dark:border-rose-900/50"
};

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

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
            const response = await api.get("/bookings");
            setBookings(response.data.bookings);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    const updateBookingStatus = async (id, status) => {
        try {
            await api.put(`/bookings/${id}`, { status });
            fetchBookings();
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBooking = async (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 border-4 border-black dark:border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Everything_Nasha</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Admin Appointment Management Dashboard</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all cursor-pointer"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm">
                        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Bookings</div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{bookings.length}</div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm">
                        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Pending Bookings</div>
                        <div className="text-2xl font-bold text-amber-600 mt-2">
                            {bookings.filter(b => b.status === "pending").length}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm">
                        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Today's Completed Revenue</div>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                            ${getTodayRevenue()}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm">
                        <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Total Completed Revenue</div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                            ${getTotalRevenue()}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
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
                                                            <span key={idx} className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-250 px-2 py-0.5 rounded text-xs font-medium">
                                                                {s}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-250 px-2 py-0.5 rounded text-xs font-medium">
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
                                                ${booking.totalCost !== undefined ? booking.totalCost : "N/A"}
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
                                                        className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
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
                </div>
            </div>
        </div>
    );
}