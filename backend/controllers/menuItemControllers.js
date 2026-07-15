import Menu from "../models/MenuItem.js";

export const getMenu = async (req, res) => {
  const menu = await Menu.find({});
  res.json(menu);
};

export const createMenuItem = async (req, res) => {
  const item = await Menu.create(req.body);
  res.status(201).json(item);
};

export const updateMenuItem = async (req, res) => {
  const item = await Menu.findById(req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  Object.assign(item, req.body);

  const updated = await item.save();
  res.json(updated);
};

export const deleteMenuItem = async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};