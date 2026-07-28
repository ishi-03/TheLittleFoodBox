import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

console.log(cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async () => ({
    folder: "little-food-box/menu",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  }),
});

export default multer({ storage });