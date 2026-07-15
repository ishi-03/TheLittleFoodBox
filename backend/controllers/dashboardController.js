import User from "../models/User.js";
import Salad from "../models/Salad.js";
import Subscription from "../models/Subscription.js";
import SubscriptionPlan from "../models/SubscriptionPlan.js";

export const getDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalPlans,
      totalSalads,
      totalSubscriptions,
      activeSubscriptions,
      recentSubscriptions,
    ] = await Promise.all([
      User.countDocuments({ role: "customer" }),

      SubscriptionPlan.countDocuments(),

      Salad.countDocuments(),

      Subscription.countDocuments(),

      Subscription.countDocuments({
        status: "active",
      }),

      Subscription.find()
        .populate("userId", "name email")
        .populate("planId", "name")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalPlans,
        totalSalads,
        totalSubscriptions,
        activeSubscriptions,
      },
      recentSubscriptions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};