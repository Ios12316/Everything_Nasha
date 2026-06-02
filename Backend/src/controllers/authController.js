import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const admin = await User.findOne({ email});

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        if (admin.role !== "admin") {
            return res.status(403).json({ message: "Access denied" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: "Logged in successfully", token, admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
        } });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}
export const logoutAdmin = (req, res) => {
    try{
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



