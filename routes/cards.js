const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  checkNewCard,
  checkCardId,
  checkDeletedCardId,
} = require('../middlewares/validation');

router.get('/', auth, getCards);

router.post('/', auth, checkNewCard, createCard);

router.delete('/:cardId', auth, checkDeletedCardId, deleteCard);

router.put('/:cardId/likes', auth, checkCardId, likeCard);

router.delete('/:cardId/likes', auth, checkCardId, dislikeCard);

module.exports = router;
