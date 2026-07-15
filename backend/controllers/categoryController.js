import Category from "../models/Category.js";

// GET ALL
export const getCategories = async (req, res) => {
  try {

    const categories = await Category.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      categories,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET SINGLE
export const getCategory = async (req, res) => {
  try {

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// CREATE
export const createCategory = async (req, res) => {

  try {

    const { name, description, image } = req.body;

    const exists = await Category.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Category created",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// UPDATE
export const updateCategory = async (req, res) => {

  try {

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Category updated",
      category,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// DELETE
export const deleteCategory = async (req, res) => {

  try {

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};