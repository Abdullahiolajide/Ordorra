const nodemailer = require('nodemailer');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const sendVerificationCode = async(req, res, code, email)=>{

        
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: `"Ordorra" <${process.env.EMAIL}>`,
        to: email,
        subject: 'Your Ordorra Verification Code',
        html: `
            <div style="font-family:sans-serif">
            <h2>Verify your email</h2>
            <p>Use the verification code below to complete your sign up:</p>
            <h1 style="letter-spacing: 4px;">${code}</h1>
            <p>This code will expire in 30 minutes.</p>
            </div>
        `
};

await transporter.sendMail(mailOptions);


}

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
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });

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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Ordorra" <${process.env.EMAIL}>`,
      to: email,
      subject: 'Your new Ordorra Verification Code',
      html: `
        <div style="font-family:sans-serif">
          <h2>Here is your new verification code</h2>
          <h1 style="letter-spacing: 4px;">${code}</h1>
          <p>This code will expire in 30 minutes.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Verification code resent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


module.exports = {
    signUp,
    verifyCode,
    resendVerificationCode,
    signIn
}