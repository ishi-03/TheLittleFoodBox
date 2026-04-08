import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User.js";
import Subscription from "./models/Subscriptions.js";
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://thelittlefoodbox:tlfbbyparul@mcpcluster.sxchofi.mongodb.net/thelittlefoodbox?retryWrites=true&w=majority")
.then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Backend running");
});
app.post("/api/subscribe", async (req, res) => {
    try {
const { timeSlot, userId } = req.body;
      const newSub = new Subscription({
  timeSlot,
  userId,
  plan: "monthly",
  startDate: new Date()
});

        await newSub.save();

        res.json({ message: "Subscription saved successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get("/api/subscriptions", async (req, res) => {
  try {
    const data = await Subscription.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json( user );
});
app.get("/api/subscriptions/:userId", async (req, res) => {
  const data = await Subscription.find({ userId: req.params.userId });
  res.json(data);
});
app.listen(5000, () => console.log("Server running on port 5000"));