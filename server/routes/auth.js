const express = require('express')
const { signUp, verifyCode, resendVerificationCode, signIn, forgotPassword, resetPassword, checkAuth, logout } = require('../controllers/auth');
const protect = require('../middleware/auth');
const router = express.Router()


router.post('/signin', signIn);
router.post('/signup', signUp)
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendVerificationCode);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.post("/logout", logout)
router.use(protect)
router.get("/me", checkAuth);

module.exports = router