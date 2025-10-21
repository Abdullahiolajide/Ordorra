const express = require("express");
const protect = require('../middleware/auth');
const { startSubscription, cancelSubscription, getSubscriptionStatus, enableSubscription } = require("../controllers/subscription");
const router = express.Router();


router.use(protect)
router.post("/start", startSubscription);
router.post("/cancel", cancelSubscription);
router.post("/enable", enableSubscription);




router.get("/status", getSubscriptionStatus);

module.exports =  router;
