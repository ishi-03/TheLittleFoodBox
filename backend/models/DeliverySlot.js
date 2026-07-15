import mongoose from "mongoose";

const deliverySlotSchema = new mongoose.Schema(
  {
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
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// 👇 Schema ke baad, export se pehle
deliverySlotSchema.index(
  { startTime: 1, endTime: 1 },
  { unique: true }
);

export default mongoose.model(
  "DeliverySlot",
  deliverySlotSchema
);