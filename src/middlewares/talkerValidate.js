const nameValidate = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório',
           });
     } 
      if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres',
           });
     }
     next();
};

const ageValidate = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório',
           });
     } 
      if (age < 18 || !Number.isInteger(age)) {
     return res.status(400).json(
        { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
           },
);
     }
     next();
};

const talkValidate = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório',
           });
     } 
     next();
};

const watchedAtValidate = (req, res, next) => {
    const regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    const { talk } = req.body;
    const validateData = regex.test(talk.watchedAt);
    if (!talk.watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório',
           });
     } 
      if (!validateData) {
      return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
           });
     }
     next();
};

const rateValidate = (req, res, next) => {
    const { talk } = req.body;
    if (talk.rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório',
           });
     } 

    if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
           });
     }
     next();
};

module.exports = {
    nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate,
};