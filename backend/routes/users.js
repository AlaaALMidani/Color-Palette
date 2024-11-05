const express = require('express');
const router = express.Router();
const { Auth } = require('../services/user');


router.get('/register', (req, res) => {
    if(Auth.regiser)
})
router.get('/generateNewPalette', (req, res) => {
    state.generatePallette()
    res.send(state)
})
