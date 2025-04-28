// backend/middlewares/auth.js
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token manquant' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(payload.id).select('-password')
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide' })
  }
}
