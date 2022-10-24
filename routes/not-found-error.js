const router = require('express').Router();

router.all('/', () => {
    // throw new NotFoundError('Запрашиваемый ресурс не найден');
    return res.status(404).send({
        message: 'Запрашиваемый ресурс не найден',
        err
    });
});

module.exports = router;