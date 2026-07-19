import Subscription from "../models/Subscription.js";
import SubscriptionPlan from "../models/SubscriptionPlan.js";

// ================= CREATE =================

export const createSubscription = async (req, res) => {
  try {
  const {
  planId,
  deliverySlotId,
  startDate,
  deliveryPattern,
  notes,
  mealSelections,
  deliveryAddress,
  paymentStatus,
  paymentId,
  orderId,
  paymentDate,
} = req.body;

    // Get selected plan
    const plan = await SubscriptionPlan.findById(planId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Subscription plan not found",
      });
    }

    // Generate blank meal selections
   

    const subscription = await Subscription.create({
      userId: req.user.id,
      planId,
      deliverySlotId,
      startDate,
      deliveryPattern,
      notes,
      mealSelections,
        deliveryAddress,
        paymentStatus,
paymentId,
orderId,
paymentDate,

    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ONE =================

export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id)
      .populate("planId")
      .populate("deliverySlotId")
.populate("mealSelections.salad")
.populate("mealSelections.deliverySlotId");
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= MY SUBSCRIPTIONS =================

export const getMySubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      userId: req.user.id,
    })
      .populate("planId")
      .populate("deliverySlotId");

    res.json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADMIN - ALL =================

export const getAllSubscriptions = async (req, res) => {
  try {
   const subscriptions = await Subscription.find()
  .populate("userId")
  .populate("planId")
  .populate("deliverySlotId")
.populate("mealSelections.salad")
.populate("mealSelections.deliverySlotId");
    res.json({
      success: true,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE =================

export const updateSubscription = async (req, res) => {
  try {
   const subscription = await Subscription.findByIdAndUpdate(
  req.params.id,
  {
    ...req.body,
  },
  {
    new: true,
    runValidators: true,
  }
);

    res.json({
      success: true,
      message: "Subscription updated",
      subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= CANCEL =================

export const cancelSubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Subscription cancelled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};