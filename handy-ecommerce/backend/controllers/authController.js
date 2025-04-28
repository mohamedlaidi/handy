// backend/controllers/authController.js
require('dotenv').config()
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body

    // Vérification du rôle
    if (!['artisan','client'].includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide : artisan ou client uniquement' })
    }

    // Création utilisateur
    const user = await User.create({ firstName, lastName, email, password, role })

    // Génération du token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Réponse JSON : token + infos utilisateur (sans le password)
    res.status(201).json({
      token,
      user: {
        _id:       user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role
      }
    })

  } catch (err) {
    console.error(err)
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Cette adresse e-mail est déjà utilisée' })
    }
    res.status(500).json({ message: 'Erreur serveur' })
  }
}

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants incorrects' })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        _id:       user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        role:      user.role
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Erreur serveur' })
  }
}
