const express = require('express')
const router = express.Router()
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
const { verifyToken } = require('../middlewares/auth')
const productController = require('../controllers/productController')

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

// Multer vers Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'handy-products', // Ton dossier Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: "limit" }] // Optionnel : resize les images
  }
})
const upload = multer({ storage })

// --- Routes ---

router.get('/', productController.getAll)

router.post(
  '/',
  verifyToken,
  upload.single('image'), // <--- ici 'image' correspond au champ du formulaire d'upload
  productController.create
)

router.get('/:id', productController.getOne)

module.exports = router
