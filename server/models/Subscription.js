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
    nextPaymentDate: {type: String},

    status: {
      type: String,
      enum: ["pending", "active", "cancelled", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
