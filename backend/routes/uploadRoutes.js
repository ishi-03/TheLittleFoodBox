import upload from "../middleware/upload.js";

router.post(
  "/",
  upload.single("image"),
  createSalad
);