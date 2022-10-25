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

    Card.findById(req.params.cardId)
        .then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!' });
            }
            if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
                return res.status(403).send({ message: 'Невозможно удалить данную карточку' });
            }
            //  Card.findByIdAndRemove(req.params.cardId);
            card.remove();
            res.status(200).send({ data: card })
        })
        //  .then((card) =>res.status(200).send({ data: card }))
        .catch((err) => {
            console.log('err = ', err);
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

/*module.exports.deleteCard = async(req, res) => {
try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
        return res.status(400).send({ message: 'Такой карточки нет!' });
    }
    if (JSON.stringify(card.owner) !== JSON.stringify(req.params.cardId)) {
        return res.status(404).send({ message: 'Невозможно удалить данную карточку', err });
    }
    // const newCard = await Card.findByIdAndRemove(req.params.cardId, req.body);

    // req.body, { new: true, runValidators: true });
    res.send(card);
} catch (err) {
    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
}
}*/

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
        )
        .then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!' });
            }
            return res.status(200).send({ data: card });
        })
        .catch((err) => {
            return res.status(400).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },
        )
        .then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!' });
            }
            return res.status(200).send({ data: card });
        })
        .catch((err) => {
            return res.status(400).send({ message: 'На сервере произошла ошибка', err });
        });
};