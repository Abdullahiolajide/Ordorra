const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');
const protect = require('../middleware/auth');

router.use(protect)

router.post('/create-product', productController.createProduct);
router.get('/get-products', productController.getMyProducts);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
