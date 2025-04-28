const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  category:    { 
    type: String, 
    required: true, 
    enum: ['Jewellery','Furniture','Clothing','Tableware'] 
  },
  price:       { type: Number, required: true },
  imageUrl:    { type: String, required: true },   // chemin vers /uploads/…
  author:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)
