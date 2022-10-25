const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
    const {
        name,
        link
    } = req.body;
    const owner = req.user._id
    Card.create({ name, link, owner })
        .then((user) => {
            res.status(201).send({ data: user });
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
            if (err.name.includes('ValidationError')) {
                return res.status(400).send({ message: 'Ошибка валидации', err });
            }
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.getCards = (req, res) => {
    Card.find({})
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.deleteCard = (req, res) => {
    const { id } = req.params;

    Card.findById(id)
        .then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!', err });
            }
            if (JSON.stringify(card.owner) !== JSON.stringify(req.card._id)) {
                return res.status(404).send({ message: 'Невозможно удалить данную карточку', err });
            }
            return Card.findByIdAndRemove(id);
        })
        .then((card) => res.status(200).send({ data: card }))
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
        )
        .populate(['owner', 'likes'])
        .then((card) => {
            //   if (!Card) {
            //       return res.status(400).send({ message: 'Такой карточки нет!' });
            //   }
            return res.status(200).send({ data: card });


        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },
        )
        .then((card) => {
            if (!card) {
                return res.status(400).send({ message: 'Такой карточки нет!' });
            }
            res.status(200).send({ data: card });
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

//module.exports = {

//}