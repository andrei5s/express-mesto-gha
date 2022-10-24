const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.all('*', () => {
    // throw new NotFoundError('Запрашиваемый ресурс не найден');
    return res.status(404).send({
        message: 'Запрашиваемый ресурс не найден',
        err
    });
});

module.exports = router;