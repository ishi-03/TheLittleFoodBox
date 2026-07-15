const adminMiddleware = (req, res, next) => {
  console.log("JWT PAYLOAD:", req.user);

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin Access Only",
    });
  }

  next();
};

export default adminMiddleware;