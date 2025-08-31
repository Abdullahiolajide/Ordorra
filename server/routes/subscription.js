const express = require("express");
const protect = require('../middleware/auth');
const { startSubscription } = require("../controllers/subscription");
const router = express.Router();

router.use(protect)
router.post("/start", startSubscription);

module.exports =  router;
