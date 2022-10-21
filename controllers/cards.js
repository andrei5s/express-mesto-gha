const Card = require('../models/card');

module.exports.createCard = (req, res) => {
    const {
        name,
        link
    } = req.body;
    const owner = req.user._id
    Card.create({ name, link, owner })
        .then((card) => {
            res.status(200).send(card);
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.getCards = (req, res) => {
    Card.find({})
        .then((user) => {
            return res.send(user);
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.deleteCard = (req, res) => {
    const { id } = req.params;

    Card.findById(id)
        .then((card) => res.status(200).send({ Card }))
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

module.exports.likeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        )
        .then((card) => {
            res.status(200).send({ Card });
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
}

module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $pull: { likes: req.user._id } }, // убрать _id из массива
            { new: true },
        )
        .then((card) => {
            res.status(200).send({ Card });
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
}