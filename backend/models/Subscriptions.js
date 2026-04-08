import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
    timeSlot: String,
  plan: String,
  startDate: Date,
  status: {
    type: String,
    default: "active"
  }
});

export default mongoose.model("Subscription", subscriptionSchema);