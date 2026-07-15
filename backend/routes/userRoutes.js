import express from "express";
import { getUsers } from "../controllers/userController.js";
import  authMiddleware  from "../middleware/authMiddleware.js";
import  adminMiddleware  from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);

export default router;