const express = require('express');
const { userProfile, adminProfile } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { allowRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/user', verifyToken, userProfile);
router.get('/admin', verifyToken, allowRoles('admin'), adminProfile);

module.exports = router;
