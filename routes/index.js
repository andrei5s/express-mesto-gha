const router = require('express').Router();
// const auth = require('../middlewares/auth');

const usersRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;
