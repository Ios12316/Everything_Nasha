import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios.js";
import Footer from "../components/Footer.jsx";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/admin/login", formData);
            localStorage.setItem("token", response.data.token);
            navigate("/admin/dashboard");
        }
        catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        }
    }
    
    return (
        <>
            <div className="min-h-[85vh] bg-white dark:bg-slate-900 transition-colors duration-300 flex justify-center items-center px-4 py-16">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white dark:bg-slate-800/40 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl"
                >
                    <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
                        Admin Login
                    </h1>

                    {message && (
                        <p className="mb-5 p-3.5 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl border border-red-100 dark:border-red-900/30 text-center transition-all duration-300 animate-fade-in">
                            {message}
                        </p>
                    )}

                    <div className="space-y-4 mb-6">
                        <div className="space-y-1">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-slate-700/80 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border border-gray-200 dark:border-slate-700/80 p-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 dark:bg-pink-600 dark:hover:bg-pink-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:scale-[1.01]"
                    >
                        Login to Dashboard
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
}