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

router.get('/', getCards);

router.post('/', checkNewCard, createCard);

router.delete('/:cardId', checkDeletedCardId, deleteCard);

router.put('/:cardId/likes', checkCardId, likeCard);

router.delete('/:cardId/likes', checkCardId, dislikeCard);

module.exports = router;
