const Product = require('../models/Product');

// Create new product
const createProduct = async (req, res) => {
  try {
    let { name, price, description, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // if (!description) description = ""

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      ownerId: req.user.userId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products for the user
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ ownerId: req.user.userId }).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.userId,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.userId },
      { name, price, description, imageUrl },
      { new: true } 
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
    createProduct,
    getMyProducts,
    deleteProduct,
    updateProduct
}