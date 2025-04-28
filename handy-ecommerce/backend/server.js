// backend/server.js
require('dotenv').config()
const express  = require('express')
const path     = require('path')
const cors     = require('cors')
const mongoose = require('mongoose')

const app = express()

// --- Connexion MongoDB ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✔ MongoDB connected'))
  .catch(err => console.error(err))

// --- Middlewares API ---
app.use(cors())
app.use(express.json())
// expose the uploads folder so images can be fetched by the front
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// --- Routes API ---
app.use('/api/auth',    require('./routes/auth'))
app.use('/api/products', require('./routes/products'))
// app.use('/api/orders',  require('./routes/orders'))

// --- Uploads statiques ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// === SERVIR LE FRONT UNIQUEMENT EN PRODUCTION ===
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../frontend/dist')
  app.use(express.static(staticPath))
  app.get('*', (req, res) =>
    res.sendFile(path.join(staticPath, 'index.html'))
  )
}

// --- Démarrage du serveur ---
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT}`))
