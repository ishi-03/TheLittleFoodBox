import mongoose from "mongoose";

const deliverySlotSchema = new mongoose.Schema(
  {
    shift: {
      type: String,
      enum: ["Lunch", "Evening"],
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "DeliverySlot",
  deliverySlotSchema
);