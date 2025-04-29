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

exports.create = async (req, res) => {
  try {
    const { name, description, price, category } = req.body
    const imageUrl = req.file?.path // 📸 Cloudinary donne directement un .path

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      author: req.user.id
    })

    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
