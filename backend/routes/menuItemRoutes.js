import express from "express";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController.js";
import upload from "../middleware/upload.js";
const router = express.Router();

// Get all menu items
router.get("/", getMenuItems);

router.post("/", upload.single("image"), createMenuItem);

router.put("/:id", upload.single("image"), updateMenuItem);

// Delete menu item
router.delete("/:id", deleteMenuItem);

export default router;