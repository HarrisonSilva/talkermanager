const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const auth = require('../middlewares/authorization');
const {
    nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate,
} = require('../middlewares/talkerValidate');

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

    const writeArchive = async (list) => {
        await fs.writeFile(pathJson, JSON.stringify(list), { encoding: 'utf8' });
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

router.post('/', auth,
    nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate, async (req, res) => {
    const filds = req.body;
    const people = await viewJson();
    const talker = { id: people.length + 1, ...filds };
    await writeArchive([...people, talker]);
    res.status(201).json(talker);
});

router.put('/:id', auth,
    nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate, async (req, res) => {
    const id = Number(req.params.id);
    const peopleResult = await viewJson();
    const talker = peopleResult.find((talk) => talk.id === id);
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    const index = peopleResult.findIndex((people) => people.id === id);
    peopleResult[index] = { id, ...req.body };
    await writeArchive(peopleResult);
    res.status(200).json(peopleResult[index]);
});

router.delete('/:id', auth, async (req, res) => {
    const id = Number(req.params.id);
    const peopleResult = await viewJson();
    const newList = peopleResult.filter((people) => people.id !== id);
    await writeArchive(newList);
    return res.sendStatus(204);
});

module.exports = router;