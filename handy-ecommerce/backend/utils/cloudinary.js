// backend/utils/cloudinary.js
const cloudinaryModule = require('cloudinary').v2

cloudinaryModule.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = { cloudinary: cloudinaryModule }
