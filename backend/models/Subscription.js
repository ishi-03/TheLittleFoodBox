import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
      required: true,
    },

    deliverySlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliverySlot",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    deliveryPattern: {
      type: String,
      enum: ["Daily", "Alternate Day"],
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },
mealSelections: [
  {
    day: Number,

    salad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salad",
    },

    dressing: {
      type: String,
      default: "",
    },

    vegan: {
      type: Boolean,
      default: false,
    },

    jain: {
      type: Boolean,
      default: false,
    },
  },
],
    status: {
      type: String,
      enum: ["active", "paused", "completed", "cancelled"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Subscription", subscriptionSchema);