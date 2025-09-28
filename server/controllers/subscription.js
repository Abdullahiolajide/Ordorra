const Subscription = require("../models/Subscription");
const User = require("../models/User.js");

// const startSubscription = async (req, res) => {
//   try {
//     const planCode = 'PLN_1a0anpb9m9vmgu8'; 
//     const user = await User.findById(req.user.userId);


//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
    
//     // Initialize transaction with Paystack
//     const response = await fetch("https://api.paystack.co/transaction/initialize", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: user.email,
//         amount:100000,
//         plan: planCode, 
//       }),
//     });

//     const data = await response.json();

//     if (!data.status) {
//       return res.status(400).json({ error: data.message });
//     }
//     console.log(data)

//     const subscription = new Subscription({
//       userId: user._id,
//       email: user.email,
//       planCode,
//       reference: data.data.reference,
//       status: "pending",
//     });
//     await subscription.save();

//     res.json({ authorization_url: data.data.authorization_url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// };
const startSubscription = async (req, res) => {
  try {
    const planCode = "PLN_1a0anpb9m9vmgu8"; 
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log("Paystack key being used:", process.env.PAYSTACK_SECRET_KEY?.slice(0, 7));


    // Check if user already has a pending subscription
    let subscription = await Subscription.findOne({
      userId: user._id,
      status: "pending",
    });

    if (subscription) {
      // Check age of pending subscription
      const createdAt = new Date(subscription.createdAt);
      const now = new Date();
      const diffMinutes = (now - createdAt) / (1000 * 60);

      if (diffMinutes < 60) {
        // Still valid within 1 hour → reuse old link
        return res.json({ authorization_url: subscription.authorizationUrl });
      } else {
        // Too old → expire it
        subscription.status = "expired";
        await subscription.save();
      }
    }

    // Initialize new Paystack transaction
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: 100000, // kobo (₦1000)
        plan: planCode,
      }),
    });

    const data = await response.json();
    if (!data.status) {
      return res.status(400).json({ error: data.message });
    }

    // Save new subscription (only one record per user)
    subscription = await Subscription.findOneAndUpdate(
      { userId: user._id }, // match user
      {
        userId: user._id,
        email: user.email,
        planCode,
        reference: data.data.reference,
        authorizationUrl: data.data.authorization_url,
        status: "pending",
      },
      { upsert: true, new: true } // create if not exists
    );

    res.json({ authorization_url: data.data.authorization_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      userId: req.user.userId,
      status: "active",
    });

    if (!subscription) {
      return res.status(404).json({ success: false, message: "No active subscription found" });
    }

    // Call Paystack disable endpoint
    await axios.post(
      "https://api.paystack.co/subscription/disable",
      {
        code: subscription.subscriptionCode,
        token: subscription.emailToken,
      },
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    subscription.status = "cancelled";
    await subscription.save();

    res.json({ success: true, message: "Subscription cancelled successfully" });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ success: false, message: "Failed to cancel subscription" });
  }
};


const getSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user.userId });

    if (!subscription) {
      return res.status(404).json({ success: false, message: "No subscription found" });
    }

    res.json({
      success: true,
      subscription,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Failed to fetch subscription status" });
  }
};


module.exports = { startSubscription, cancelSubscription, getSubscriptionStatus };
