module.exports = (req, res, next) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword === "admin123") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid admin password" });
  }
};
