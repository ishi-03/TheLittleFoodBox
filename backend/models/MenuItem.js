import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: String,
    price: mongoose.Schema.Types.Mixed,

    veg: {
      type: Boolean,
      default: false,
    },

    spicy: {
      type: Boolean,
      default: false,
    },

    chefPick: {
      type: Boolean,
      default: false,
    },

    popular: {
      type: Boolean,
      default: false,
    },

    category: [String],

    section: String,
    cuisine: String,

    photo: String,

    serves: String,
    unit: String,
    minOrder: Number,
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuItemSchema);

export default Menu;