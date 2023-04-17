const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const pathJson = path.resolve(__dirname, '../talker.json');

const viewJson = async () => {
    try {
        const archiveJson = await fs.readFile(pathJson);
        return JSON.parse(archiveJson);
    } catch (error) {
        console.log(error);
    }
};

router.get('/', async (req, res) => {
    try {
      const peopleResult = await viewJson();
      res.status(200).json(peopleResult);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;