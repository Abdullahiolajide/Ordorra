const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const Subscription = require("../models/Subscription");

router.post("/paystack/webhook", express.json({ type: "application/json" }), async (req, res) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.sendStatus(401);
  }

  const event = req.body;
  res.sendStatus(200);

  try {
    if (event.event === "subscription.create") {
      // Update existing pending subscription
      await Subscription.findOneAndUpdate(
        { email: event.data.customer.email },
        {
          status: event.data.status,
          subscriptionCode: event.data.subscription_code,
          emailToken: event.data.email_token,
          subscriptionUrl: event.data.subscription_url,
          nextPaymentDate: event.data.next_payment_date
        },
        { new: true }
      );
      console.log("📌 Subscription created for:", event.data.customer.email);
      
    } else if (event.event === "charge.success") {
      const currentDate = new Date(event.data.created_at)
      const nextPaymentDate = new Date(currentDate)
      nextPaymentDate.setDate(currentDate.getDate() + 30)

      await Subscription.findOneAndUpdate(
        { email: event.data.customer.email },
        {nextPaymentDate: nextPaymentDate},
        { status: "active" },
        { new: true }
      );
      console.log("✅ Charge successful for:", event.data.customer.email);

    } else if (event.event === "subscription.disable") {
      await Subscription.findOneAndUpdate(
        { subscriptionCode: event.data.subscription_code },
        { status: "disabled" }
      );
      console.log("🚫 Subscription disabled");

    } else if (event.event === "subscription.enable") {
      await Subscription.findOneAndUpdate(
        { subscriptionCode: event.data.subscription_code },
        { status: "active" }
      );
      console.log("🔄 Subscription re-enabled");

    } else {
      console.log("⚠️ Unhandled event:", event.event);
    }
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
  } finally {
    console.log("📩 Webhook processed:", event.event);
  }
});


module.exports = router;
