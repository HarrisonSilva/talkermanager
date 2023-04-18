const emailValidate = (req, res, next) => {
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    const { email } = req.body;
    const validateEmail = regex.test(email);
    if (!email) {
       return res.status(400).json({ message: 'O campo "email" é obrigatório',
          });
    } 
     if (!validateEmail) {
       return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"',
          });
    }

 next();
};

const passwordValidate = (req, res, next) => {
    const { password } = req.body;
    console.log(password);
    if (!password) {
       return res.status(400).json({ message: 'O campo "password" é obrigatório',
          });
    }
    if (password.length < 6) {
       return res.status(400).json({
            message: 'O "password" deve ter pelo menos 6 caracteres',
          });
    }
 next();
};

module.exports = {
    passwordValidate,
    emailValidate,
};