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
deliveryAddress: {
  fullName: String,
  phone: String,
  alternatePhone: String,
  house: String,
  street: String,
  landmark: String,
  city: String,
  state: String,
  pincode: String,
  addressType: String,
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
    mealNo: Number,

    date: Date,

    deliverySlotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliverySlot",
    },

    salad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Salad",
    },

    dressing: String,

    vegan: Boolean,

    jain: Boolean,

    isEdited: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Delivered",
        "Skipped",
      ],
      default: "Pending",
    },
  },
],

status: {
  type: String,
  enum: ["active", "paused", "completed", "cancelled"],
  default: "active",
},

paymentStatus: {
  type: String,
  default: "Paid",
},

paymentId: String,

orderId: String,

paymentDate: Date,
},
  {
    timestamps: true,
  }
);


export default mongoose.model("Subscription", subscriptionSchema);