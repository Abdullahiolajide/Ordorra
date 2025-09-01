const express = require("express");
const protect = require('../middleware/auth');
const { startSubscription, cancelSubscription, getSubscriptionStatus } = require("../controllers/subscription");
const router = express.Router();

router.use(protect)
router.post("/start", startSubscription);
router.post("/cancel", cancelSubscription);
router.get("/status", getSubscriptionStatus);

module.exports =  router;
