import mongoose from "mongoose";

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    units: {
      type: Number,
      required: true,
    },

    validity: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    pricePerUnit: {
      type: Number,
      default: 0,
    },

    deliveryPatterns: [
      {
        type: String,
        enum: ["Daily", "Alternate Day"],
      },
    ],

    active: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    themeColor: {
      type: String,
      default: "#4F6F52",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "SubscriptionPlan",
  subscriptionPlanSchema
);