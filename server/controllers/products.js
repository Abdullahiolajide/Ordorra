const Product = require('../models/Product');

// Create new product
const createProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;

    if (!name || !price || !description || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      ownerId: req.user.userId, // assuming you're using authentication middleware
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products for a user
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    createProduct,
    getMyProducts,
    deleteProduct
}