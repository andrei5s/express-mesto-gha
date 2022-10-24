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
                throw new BadRequestError('Ошибка валидации данных');
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


/*module.exports.deleteCard = (req, res) => {
    const { id } = req.params;

    Card.findById(id)
        .then((card) => res.status(200).send({ Card }))
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};*/

module.exports.deleteCard = (req, res, next) => {
    const { id } = req.params;

    Card.findById(id)
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Такой карточки нет!');
            }
            if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
                throw new BadRequestError('Невозможно удалить данную карточку');
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
            req.params.cardId, { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
            { new: true },
        )
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Такой карточки нет!');
            }
            res.status(200).send({ data: card });
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};

/*module.exports.likeCard = (req, res, next) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true },
        )
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Такой карточки нет!');
            }
            res.status(STATUS_OK).send({ data: card });
        })
        .catch(next);
};*/



module.exports.dislikeCard = (req, res) => {
    Card.findByIdAndUpdate(
            req.params.cardId, { $pull: { likes: req.user._id } }, { new: true },
        )
        .then((card) => {
            if (!card) {
                throw new NotFoundError('Такой карточки нет!');
            }
            res.status(200).send({ data: card });
        })
        .catch((err) => {
            return res.status(500).send({ message: 'На сервере произошла ошибка', err });
        });
};