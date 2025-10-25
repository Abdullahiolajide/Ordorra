const nodemailer = require('nodemailer');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const {Resend} = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const checkAuth = (req, res) => {
  res.json({ ok: true});
};

const logout = (req, res) => {
  res.clearCookie("ord_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  console.log("logged out");
  res.json({ success: true });
};




const sendVerificationCode = async (req, res, code, email) => {
  try {
    await resend.emails.send({
      from: `"Ordorra" <no-reply@ordorra.app>`, // ✅ can change to custom later (e.g. no-reply@ordorra.app)
      to: email,
      subject: "Your Ordorra Verification Code",
      html: `
        <div style="font-family:sans-serif">
          <h2>Verify your email</h2>
          <p>Use the verification code below to complete your sign up:</p>
          <h1 style="letter-spacing: 4px;">${code}</h1>
          <p>This code will expire in 30 minutes.</p>
        </div>
      `,
    });


  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Email failed" });
  }
};


const signUp = async (req, res)=>{
     const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
      const expires = new Date(Date.now() + 30 * 60 * 1000); // expires in 10 mins
        

   try {
    const { email, password } = req.body;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      verificationCode: code,
      codeExpires: expires
    });
    await sendVerificationCode(req, res, code, email)

    res.status(201).json({
      message: 'User created successfully',
      data: {
          email: user.email,
          _id: user._id
        }
    });
  } catch (err) {
     if (err.code === 11000 && err.keyPattern.email) {
      return res.status(400).json({ message: 'Email already exists, go to Sign In' });
    }

    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }

}

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });

    if (!user.verified)
      return res.status(403).json({ message: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
    );
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("ord_token", token, {
      httpOnly: true,
      secure: isProd,             // ✅ true only in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ✅ local dev still works
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ success: true });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.verified)
    return res.status(400).json({ message: "Invalid or already verified" });

  if (user.verificationCode !== code)
    return res.status(400).json({ message: "Invalid code" });

  if (Date.now() > user.codeExpires)
    return res.status(400).json({ message: "Code expired" });

  user.verified = true;
  user.verificationCode = null;
  user.codeExpires = null;
  await user.save();

  res.status(200).json({ message: "Email verified successfully." });
};

const resendVerificationCode = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.verified) return res.status(400).json({ message: 'User already verified' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    user.verificationCode = code;
    user.codeExpires = expires;
    await user.save();

    await resend.emails.send({
      from: `"Ordorra" <no-reply@ordorra.app>`, // change to no-reply@ordorra.app later if you want
      to: email,
      subject: 'Your new Ordorra Verification Code',
      html: `
        <div style="font-family:sans-serif">
          <h2>Here is your new verification code</h2>
          <h1 style="letter-spacing: 4px;">${code}</h1>
          <p>This code will expire in 30 minutes.</p>
        </div>
      `,
    });

    res.status(200).json({ message: 'Verification code resent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 30 * 60 * 1000);

    user.resetCode = code;
    user.resetExpires = expires;
    await user.save();


    await resend.emails.send({
      from: `"Ordorra" <no-reply@ordorra.app>`,
      to: email,
      subject: 'Password Reset Code',
      html: `
        <h2>Reset your password</h2>
        <p>Use the code below to reset your password:</p>
        <h1>${code}</h1>
        <p>This code expires in 30 minutes.</p>
      `
    });

    res.status(200).json({ message: 'Reset code sent to your email' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.resetCode !== code)
      return res.status(400).json({ message: 'Invalid code or email' });

    if (user.resetExpires < new Date())
      return res.status(400).json({ message: 'Code expired' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetCode = null;
    user.resetExpires = null;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};




module.exports = {
    signUp,
    verifyCode,
    resendVerificationCode,
    signIn,
    forgotPassword,
    resetPassword,
    checkAuth,
    logout
}