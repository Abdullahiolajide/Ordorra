const express = require('express')
const { signUp, verifyCode, resendVerificationCode, signIn, forgotPassword, resetPassword } = require('../controllers/auth')
const router = express.Router()


router.post('/signin', signIn);
router.post('/signup', signUp)
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendVerificationCode);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router