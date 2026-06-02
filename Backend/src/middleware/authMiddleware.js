import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
    try {
        const secretKey = process.env.JWT_SECRET;
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        const decodedToken = jwt.verify(token, secretKey);

        if (!decodedToken) return res.status(401).json({ message: 'Unauthorized' });

        req.user = await User.findById(decodedToken.id).select("-password");
        if (!req.user) return res.status(404).json({ message: 'User not found' });
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export default authMiddleware;