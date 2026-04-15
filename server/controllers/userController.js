const userProfile = async (req, res) => {
  return res.json({
    message: 'user route accessed',
    user: req.user,
  });
};

const adminProfile = async (req, res) => {
  return res.json({
    message: 'admin route accessed',
    user: req.user,
  });
};

module.exports = {
  userProfile,
  adminProfile,
};
