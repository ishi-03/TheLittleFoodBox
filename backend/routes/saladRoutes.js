import express from "express";

import {
  getSalads,
  getSalad,
  createSalad,
  updateSalad,
  deleteSalad,
} from "../controllers/saladController.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ================= PUBLIC =================

router.get("/", getSalads);

router.get("/:id", getSalad);

// ================= ADMIN =================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createSalad
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateSalad
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteSalad
);

export default router;