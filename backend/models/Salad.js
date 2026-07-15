import mongoose from "mongoose";

const saladSchema = new mongoose.Schema(
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

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "",
    },

    ingredients: [
      {
        type: String,
        trim: true,
      },
    ],

    dressings: [
      {
        type: String,
        trim: true,
      },
    ],

    calories: {
      type: Number,
      default: 0,
    },

    protein: {
      type: Number,
      default: 0,
    },

    carbs: {
      type: Number,
      default: 0,
    },

    fat: {
      type: Number,
      default: 0,
    },

    variants: {
      regular: {
        type: Boolean,
        default: true,
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

export default mongoose.model("Salad", saladSchema);