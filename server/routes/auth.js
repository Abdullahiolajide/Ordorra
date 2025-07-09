const express = require('express')
const { signUp, verifyCode, resendVerificationCode, signIn } = require('../controllers/auth')
const router = express.Router()


router.post('/signin', signIn);
router.post('/signup', signUp)
router.post('/verify-code', verifyCode);
router.post('/resend-code', resendVerificationCode);

module.exports = router