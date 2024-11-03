const express = require('express');
const router = express.Router();
const { Color, State, ColorPalette, ColorPaletteLogic } = require('../services/colorsService');

// let state = new ColorPaletteGenerator(2);

// router.get('/', (req, res) => {
//     res.send(new ColorPaletteGenerator(2))
// })
// router.get('/generateNewPalette', (req, res) => {
//     state.generatePallette()
//     res.send(state)
// })

module.exports = router