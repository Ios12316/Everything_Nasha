import express from "express";
import { loginAdmin, logoutAdmin } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);
router.get("/dashboard", authMiddleware, (req, res) => {
    res.status(200).json(req.user);
});


export default router;