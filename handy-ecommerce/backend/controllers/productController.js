const Product = require('../models/Product')

// GET /api/products
exports.getAll = async (req,res) => {
  const prods = await Product.find().populate('author','firstName lastName')
  res.json(prods)
}

// POST /api/products
exports.create = async (req, res) => {
  try {
    const { name, price, description, category } = req.body
    const imageUrl = req.file.path // Attention : avec Cloudinary c'est .path !

    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl, // on sauvegarde l'URL Cloudinary ici
      author: req.userId
    })

    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating product' })
  }
}

// after your existing exports.getAll & exports.create
exports.getOne = async (req, res) => {
    try {
      const prod = await Product
        .findById(req.params.id)
        .populate('author', 'firstName lastName')
      if (!prod) return res.status(404).json({ message: 'Produit non trouvé' })
      res.json(prod)
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Erreur serveur' })
    }
  }
  
