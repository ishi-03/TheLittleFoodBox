import mongoose from "mongoose";
import dotenv from "dotenv";
import MenuItem from "./models/MenuItem.js";
dotenv.config();


async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await MenuItem.insertMany(menu);

    console.log("✅ Menu Imported Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();