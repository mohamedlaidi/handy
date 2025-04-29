// backend/server.js
require('dotenv').config()
const express  = require('express')
const cors     = require('cors')
const mongoose = require('mongoose')
const path     = require('path')

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

// --- Routes API ---
app.use('/api/auth',    require('./routes/auth'))
app.use('/api/products', require('./routes/products'))

// === SERVIR LE FRONT UNIQUEMENT EN PRODUCTION ===
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../frontend/dist')
  app.use(express.static(staticPath))
  // catch-all basé sur un RegExp, sans parenthèses dans le path
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'))
  })
}

// --- Démarrage du serveur ---
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`⚡️ Server running on port ${PORT}`))
