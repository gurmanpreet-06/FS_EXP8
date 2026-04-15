const allowRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ message: 'forbidden: insufficient role' });
  }

  return next();
};

module.exports = {
  allowRoles,
};
