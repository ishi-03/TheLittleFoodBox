import MenuItem from "../models/MenuItem.js";

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find().sort({
      order: 1,
      createdAt: 1,
    });

    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create menu item
export const createMenuItem = async (req, res) => {
  try {
const menuItem = await MenuItem.create({
  ...req.body,
  image: req.file ? req.file.path : "",
});
    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      menuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update menu item
export const updateMenuItem = async (req, res) => {
  try {
   const updateData = {
  ...req.body,
};

if (req.file) {
  updateData.image = req.file.path;
}

const menuItem = await MenuItem.findByIdAndUpdate(
  req.params.id,
  updateData,
  { new: true }
);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item updated successfully",
      menuItem,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};

// Delete menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};