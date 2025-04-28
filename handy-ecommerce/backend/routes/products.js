const express = require('express')
const router  = express.Router()
const multer  = require('multer')
const path    = require('path')
const { verifyToken } = require('../middlewares/auth')
const productController = require('../controllers/productController')

// configure multer vers /backend/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})
const upload = multer({ storage })

// GET /api/products
router.get('/', productController.getAll)

// POST /api/products (auth + upload)
router.post(
  '/',
  verifyToken,
  upload.single('image'),
  productController.create
)

// GET /api/products/:id
router.get('/:id', productController.getOne)

module.exports = router
