import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      default: "",
    },

    serves: {
      type: String,
      default: "",
    },

    minOrder: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },

    chefPick: {
      type: Boolean,
      default: false,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    spicy: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: "",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
    description: {
  type: String,
  default: "",
},

jain: {
  type: Boolean,
  default: false,
},


  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MenuItem", menuItemSchema);