const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true },


    planCode: { type: String, required: true },

    // Paystack subscription details
    reference: { type: String, required: true },
    subscriptionCode: { type: String }, 
    emailToken: { type: String },
    subscriptionUrl: { type: String },
    authorizationUrl: { type: String },
    nextPaymentDate: {type: Date},

    status: {
      type: String,
      enum: ["pending", "active", "cancelled", "failed", "expired"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
