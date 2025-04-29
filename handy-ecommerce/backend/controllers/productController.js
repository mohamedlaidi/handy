// backend/controllers/productController.js
const Product = require('../models/Product')

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find().populate('author', 'firstName lastName')
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('author', 'firstName lastName')
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// backend/controllers/productController.js
exports.create = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrl = req.file?.path;
    const newProduct = new Product({ name, description, price, category, imageUrl, author: req.user.id });
    await newProduct.save();
    return res.status(201).json(newProduct);
  } catch (err) {
    console.error('❌ productController.create error:', err);
    // renvoie d’avantage d’infos pour le debug
    return res
      .status(500)
      .json({ message: err.message, stack: err.stack.split('\n').slice(0,3) });
  }
}
