const express = require('express');
const tokenGenerator = require('../services/tokenGenerator');

const router = express.Router();
router.post('/', (req, res) => {
    const token = tokenGenerator();
    res.status(200).json({ token });
});

module.exports = router;