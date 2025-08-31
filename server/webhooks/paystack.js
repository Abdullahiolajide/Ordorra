const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const Subscription = require("../models/Subscription");

router.post("/paystack/webhook", express.json({ type: "*/*" }), async (req, res) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
  }

  const event = req.body;

  try {
    if (event.event === "subscription.create") {
      await Subscription.findOneAndUpdate(
        { email: event.data.customer.email },
        {
          status: event.data.status,
          subscriptionCode: event.data.subscription_code,
          emailToken: event.data.email_token,
        },
        { upsert: true }
      );

    } else if (event.event === "subscription.disable") {
      await Subscription.findOneAndUpdate(
        { subscriptionCode: event.data.subscription_code },
        { status: "disabled" }
      );

    } else if (event.event === "subscription.enable") {
      await Subscription.findOneAndUpdate(
        { subscriptionCode: event.data.subscription_code },
        { status: "active" }
      );

    } else if (event.event === "charge.success") {
      console.log("Charge successful for:", event.data.customer.email);

    } else {
      console.log("Unhandled event:", event.event);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  finally{
    console.log('Wehook was used')
  }
});

module.exports = router;
