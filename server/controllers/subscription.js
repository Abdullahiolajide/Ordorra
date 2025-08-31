const Subscription = require("../models/Subscription");
const User = require("../models/User.js");

const startSubscription = async (req, res) => {
  try {
    const planCode = 'PLN_1a0anpb9m9vmgu8'; // ⚡ expect Paystack's plan_code from frontend
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Initialize transaction with Paystack
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount:100000,
        plan: planCode, // ✅ must be plan_code from Paystack dashboard
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return res.status(400).json({ error: data.message });
    }
    console.log(data)

    // Save subscription with status "pending"
    const subscription = new Subscription({
      userId: user._id,
      email: user.email,
      planCode,
      reference: data.data.reference,
      status: "pending",
    });
    await subscription.save();

    res.json({ authorization_url: data.data.authorization_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { startSubscription };
