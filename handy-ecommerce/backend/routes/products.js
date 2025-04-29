// backend/routes/products.js
const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')
const { upload } = require('../middlewares/cloudinaryUpload') // 🆕 Nouveau middleware
const productController = require('../controllers/productController')

// GET all products
router.get('/', productController.getAll)

// GET single product
router.get('/:id', productController.getOne)

// POST create product (avec Cloudinary upload)
router.post('/', verifyToken, upload.single('image'), productController.create)

module.exports = router
