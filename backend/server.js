import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

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
dotenv.config();
import dashboardRoutes from "./routes/dashboardRoutes.js";
const app = express();

// -------------------- Middleware --------------------

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://thelittlefoodbox-1.onrender.com",
      "https://thelittlefoodbox.com",
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

app.use("/api/subscription-plans", subscriptionPlanRoutes);

app.use("/api/delivery-slots", deliverySlotRoutes);

// app.use("/api/orders", orderRoutes);

app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
// -------------------- Start Server --------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});