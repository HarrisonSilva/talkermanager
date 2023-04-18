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
      res.status(200).json([]);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const id = Number(req.params.id);
      const peopleResult = await viewJson();
      const talker = peopleResult.find((talk) => talk.id === id);
        if (talker) {
        res.status(200).json(talker);
       } else {
           return res.status(404).json({
                message: 'Pessoa palestrante não encontrada',
              });
       }
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;