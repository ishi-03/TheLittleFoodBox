import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
// import menuItemRoutes from "./routes/menuItemRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import subscriptionPlanRoutes from "./routes/subscriptionPlanRoutes.js";
import deliverySlotRoutes from "./routes/deliverySlotRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import saladRoutes from "./routes/saladRoutes.js";
// dotenv.config();
console.log("SERVER API KEY:", process.env.CLOUDINARY_API_KEY);
import dashboardRoutes from "./routes/dashboardRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
const app = express();

// -------------------- Middleware --------------------

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://thelittlefoodbox.com",
      "https://www.thelittlefoodbox.com",
      "https://thelittlefoodbox-2.onrender.com",
    ],
    credentials: true,
  })
);

// -------------------- MongoDB --------------------

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// -------------------- Test Route --------------------

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// -------------------- API Routes --------------------

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/categories", categoryRoutes);

// app.use("/api/menu-items", menuItemRoutes);
app.use("/api/salads", saladRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
console.log("Subscription Plan Route Loaded");
app.use("/uploads", express.static("uploads"));

app.use("/api/subscription-plans", subscriptionPlanRoutes);

app.use("/api/delivery-slots", deliverySlotRoutes);

// app.use("/api/orders", orderRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/menu-items", menuItemRoutes);
// -------------------- Start Server --------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});