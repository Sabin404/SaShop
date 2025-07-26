const router = require('express').Router();
const { registerUser, loginUser,logoutUser} = require('../../controllers/auth/auth.controllers');
const {authMiddleware} = require('../../middleware/auth.middleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/check-auth', authMiddleware, (req, res) => {
  res.status(200).json({ success: true, user: req.user });

});
module.exports = router;