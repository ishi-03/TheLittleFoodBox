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


// ---- Platter customization (NEW) ----
hasCustomization: {
  type: Boolean,
  default: false,
},

customizationGroups: [
  {
    title: { type: String, required: true },   // e.g. "Choose Dips"
    maxSelect: { type: Number, default: 1 },     // e.g. 2 → "choose any 2"
    options: [{ type: String }],                 // e.g. ["Hummus", "Guacamole", "Salsa"]
  },
],

},

  
  {
    timestamps: true,
  }
);

export default mongoose.model("MenuItem", menuItemSchema);