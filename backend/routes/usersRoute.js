const express = require('express');
const router = express.Router();
const UserServices = require('../services/userService');


router.post('/register', async (req, res) => {
    console.log(req.body)
    const registered = await UserServices.register(req.body);
    return res.send(registered)
})
router.post('/login',async (req, res) => {
    console.log(req.body)
    const loggedIn = await UserServices.login(req.body);
    res.send(loggedIn)
})

module.exports = router