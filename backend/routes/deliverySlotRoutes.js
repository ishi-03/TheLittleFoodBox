import express from "express";

import {
  getDeliverySlots,
  getDeliverySlot,
  createDeliverySlot,
  updateDeliverySlot,
  deleteDeliverySlot,
} from "../controllers/deliverySlotController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getDeliverySlots);

router.get("/:id", getDeliverySlot);

// Admin
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createDeliverySlot
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateDeliverySlot
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteDeliverySlot
);

export default router;