const express = require('express')
const router = express.Router();
const storeInfo = require('../controllers/storeInfo')
const protect = require('../middleware/auth');

router.use(protect)

router.post('/info', storeInfo.setStoreInfo);
router.get('/info', storeInfo.getStoreInfo);
router.put('/info', storeInfo.editStoreInfo);

module.exports = router;
