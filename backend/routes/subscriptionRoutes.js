import express from "express";

import {
  createSubscription,
  getMySubscriptions,
  getAllSubscriptions,
  getSubscription,
  updateSubscription,
  cancelSubscription,
} from "../controllers/subscriptionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer
router.post("/", authMiddleware, createSubscription);

router.get("/my", authMiddleware, getMySubscriptions);
router.get(
  "/:id",
  authMiddleware,
  getSubscription
);
// Admin
router.get("/", authMiddleware, adminMiddleware, getAllSubscriptions);

router.put("/:id", authMiddleware, adminMiddleware, updateSubscription);

router.delete("/:id", authMiddleware, adminMiddleware, cancelSubscription);

export default router;