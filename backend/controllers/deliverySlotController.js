import DeliverySlot from "../models/DeliverySlot.js";

// ================= GET ALL =================

export const getDeliverySlots = async (req, res) => {
  try {
const slots = await DeliverySlot.find().sort({ sortOrder: 1 });
    res.status(200).json({
      success: true,
      slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ONE =================

export const getDeliverySlot = async (req, res) => {
  try {
    const slot = await DeliverySlot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Delivery slot not found",
      });
    }

    res.json({
      success: true,
      slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE =================

export const createDeliverySlot = async (req, res) => {
  try {
    const {
      shift,
      startTime,
      endTime,
      active,
      sortOrder,
    } = req.body;

    const exists = await DeliverySlot.findOne({
      shift,
      startTime,
      endTime,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Slot already exists",
      });
    }

    const newSlot = await DeliverySlot.create({
      shift,
      startTime,
      endTime,
      active,
      sortOrder,
    });

    res.status(201).json({
      success: true,
      message: "Delivery slot created",
      slot: newSlot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateDeliverySlot = async (req, res) => {
  try {
    const slot = await DeliverySlot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Delivery slot updated",
      slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================

export const deleteDeliverySlot = async (req, res) => {
  try {
    await DeliverySlot.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Delivery slot deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};