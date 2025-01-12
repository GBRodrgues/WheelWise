const express = require('express');
const router = express.Router();
const Motocicleta = require('../models/Motocicleta');
// Padrão controller graps, pois a rota atua como controller

// Rota para obter todas as motocicletas
router.get('/', async (req, res) => {
  try {
    const motos = await Motocicleta.findAll();
    res.json(motos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para adicionar uma nova motocicleta
router.post('/', async (req, res) => {
  try {
    const novaMoto = await Motocicleta.create(req.body); // Padrão Creator (GRASP)
    res.json(novaMoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
