const router = require('express').Router();
const { registerUser, loginUser} = require('../../controllers/auth/auth.controllers');

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/logout', logoutUser);
module.exports = router;