import express from "express";

import {
  getSubscriptionPlans,
  getSubscriptionPlan,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
} from "../controllers/subscriptionPlanController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getSubscriptionPlans);

router.get("/:id", getSubscriptionPlan);

// Admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createSubscriptionPlan
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateSubscriptionPlan
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteSubscriptionPlan
);

export default router;