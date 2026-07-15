import SubscriptionPlan from "../models/SubscriptionPlan.js";

// ================= GET ALL PLANS =================

export const getSubscriptionPlans = async (req, res) => {
  try {
const plans = await SubscriptionPlan.find().sort({ sortOrder: 1 });
    res.status(200).json({
      success: true,
      plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET SINGLE PLAN =================

export const getSubscriptionPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    res.json({
      success: true,
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CREATE PLAN =================
export const createSubscriptionPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      units,
      validity,
      price,
      pricePerUnit,
      deliveryPatterns,
      active,
      sortOrder,
      themeColor,
    } = req.body;

    const exists = await SubscriptionPlan.findOne({ name });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Plan already exists",
      });
    }

    const plan = await SubscriptionPlan.create({
      name,
      description,
      units,
      validity,
      price,
      pricePerUnit,
      deliveryPatterns,
      active,
      sortOrder,
      themeColor,
    });

    res.status(201).json({
      success: true,
      message: "Subscription plan created",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PLAN =================

export const updateSubscriptionPlan = async (req, res) => {
  try {
    const plan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Plan updated",
      plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE PLAN =================

export const deleteSubscriptionPlan = async (req, res) => {
  try {
    await SubscriptionPlan.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Plan deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};