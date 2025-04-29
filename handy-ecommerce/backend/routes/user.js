const express = require('express');
const User = require('../models/User');
const { upload } = require('../middlewares/cloudinaryUpload');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware pour vérifier le token
function verifyToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Accès non autorisé');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Utilise la clé d'environnement
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send('Token invalide');
  }
}

// Récupérer le profil de l'utilisateur connecté
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

// Mettre à jour le profil de l'utilisateur
router.put('/profile', verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    if (req.user.profilePublished) {
      return res.status(400).send('Le profil est déjà publié et ne peut pas être modifié.');
    }

    const { bio } = req.body;
    let profileImage = req.file ? req.file.path : req.user.profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { bio, profileImage, profilePublished: true }, // Marquer le profil comme publié
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
