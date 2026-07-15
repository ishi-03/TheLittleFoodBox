import Salad from "../models/Salad.js";

// ================= GET ALL =================

export const getSalads = async (req, res) => {
  try {
    const salads = await Salad.find().sort({ sortOrder: 1 });

    res.status(200).json({
      success: true,
      salads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ONE =================

export const getSalad = async (req, res) => {
  try {
    const salad = await Salad.findById(req.params.id);

    if (!salad) {
      return res.status(404).json({
        success: false,
        message: "Salad not found",
      });
    }

    res.status(200).json({
      success: true,
      salad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE =================

export const createSalad = async (req, res) => {
  try {
    const exists = await Salad.findOne({
      name: req.body.name,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Salad already exists",
      });
    }

    const salad = await Salad.create({
      ...req.body,
      image: req.file ? req.file.path : "",
      ingredients: JSON.parse(req.body.ingredients || "[]"),
      dressings: JSON.parse(req.body.dressings || "[]"),
      variants: JSON.parse(req.body.variants || "{}"),
    });

    res.status(201).json({
      success: true,
      message: "Salad created successfully",
      salad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= UPDATE =================

export const updateSalad = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (req.body.ingredients)
      updateData.ingredients = JSON.parse(req.body.ingredients);

    if (req.body.dressings)
      updateData.dressings = JSON.parse(req.body.dressings);

    if (req.body.variants)
      updateData.variants = JSON.parse(req.body.variants);

    const salad = await Salad.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!salad) {
      return res.status(404).json({
        success: false,
        message: "Salad not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Salad updated successfully",
      salad,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= DELETE =================

export const deleteSalad = async (req, res) => {
  try {
    const salad = await Salad.findByIdAndDelete(req.params.id);

    if (!salad) {
      return res.status(404).json({
        success: false,
        message: "Salad not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Salad deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};