const express = require("express");
const router = express.Router();
const protect = require('../middleware/auth');
const { signUpload, deleteImage } = require("../controllers/cloudinary");

router.get("/sign", signUpload);

router.use(protect)
router.post("/delete", deleteImage);

module.exports = router;
