const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },

    // Paystack plan code (from your dashboard)
    planCode: { type: String, required: true },

    // Paystack subscription details
    reference: { type: String, required: true }, // initial transaction reference
    subscriptionCode: { type: String }, // returned by Paystack on successful subscription
    emailToken: { type: String }, // needed to manage/cancel subscription
    subscriptionUrl: { type: String }, // needed to manage/cancel subscription

    status: {
      type: String,
      enum: ["pending", "active", "cancelled", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
