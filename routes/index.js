const router = require('express').Router();

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const notFoundRouter = require('./not-found-error');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/not-found-error', notFoundRouter);


module.exports = router;