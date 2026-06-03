import axios from "axios";

const api = axios.create({
    baseURL: typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
        ? "http://localhost:5000/api"
        : "https://everything-nasha.vercel.app/api",
    headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
    },
    withCredentials: true,
});

export default api;