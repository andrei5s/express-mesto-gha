const router = require('express').Router();

const {
    getCards,
    createCard,
    deleteCard,
    likeCard,
    dislikeCard
} = require('../controllers/cards.js');

router.get('/', getCards);

router.post('/', createCard);

router.delete('/:id', deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;