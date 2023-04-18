const express = require('express');
const tokenGenerator = require('../services/tokenGenerator');
const { emailValidate, passwordValidate } = require('../middlewares/loginValidate');

const router = express.Router();
router.post('/', emailValidate, passwordValidate, (req, res) => {
    const token = tokenGenerator();
    res.status(200).json({ token });
});

module.exports = router;