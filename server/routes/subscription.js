const express = require("express");
const protect = require('../middleware/auth');
const { startSubscription, cancelSubscription, getSubscriptionStatus, enableSubscription } = require("../controllers/subscription");
const { default: axios } = require("axios");
const router = express.Router();
console.log('subscription routes loaded')
const func = async()=>{
    const { data } = await axios.get(
  `https://api.paystack.co/subscription/SUB_zelk7hrd11z9wg2`,
  { headers: { Authorization: `Bearer sk_test_1857a1794bcef81cfb329915f7d2bca9bdf4c58c` } }
);

console.log(data);
}

func()
router.use(protect)
router.post("/start", startSubscription);
router.post("/cancel", cancelSubscription);
router.post("/enable", enableSubscription);




router.get("/status", getSubscriptionStatus);

module.exports =  router;
