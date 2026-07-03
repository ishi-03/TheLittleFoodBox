import express from "express";
import {
  getMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuControllers.js";

const router = express.Router();

router.route("/")
  .get(getMenu)
  .post(createMenuItem);

router.route("/:id")
  .put(updateMenuItem)
  .delete(deleteMenuItem);

export default router;