const express = require('express');
const router = express.Router();
const Motocicleta = require('../models/Motocicleta');
const Fabricantes = require('../models/Fabricantes');
const Img_motocicletas = require('../models/Img_motocicleta');


// Padrão controller graps, pois a rota atua como controller

// Rota para obter todas as motocicletas


function inserir_img(data){
  console.log(data)
}


router.get('/', async (req, res) => {
  try {
    const motos = await Motocicleta.findAll();
    const fabricantes = await Fabricantes.findAll();
    const imgs = await Img_motocicletas.findAll();
    fabricantes.forEach(fab => {
      console.log(fab.toJSON())
    });

    //console.log(Imgs);
    res.json(motos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
3


// Rota para adicionar uma nova motocicleta
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const novaMoto = await Motocicleta.create(req.body); // Padrão Creator (GRASP)
    res.json(novaMoto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
