const Card = require('../models/card');
const BadRequestError = require('../errors/bedrequserror');
const NotFoundError = require('../errors/not-found-err');

const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

module.exports.createCard = (req, res, next) => {
    const {
        name,
        link,
    } = req.body;
    const owner = req.user._id;
    Card.create({ name, link, owner })
        /*.then((user) => {
            res.status(201).send({ data: user });
        })
        .catch((err) => {
            if (err.name.includes('ValidationError')) {
                return res.status(400).send({ message: 'Ошибка валидации' });
            }
            return res.status(500).send({ message: 'На сервере произошла ошибка' });
        });*/
        .then((user) => res.status(STATUS_CREATED).send({ data: user }))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
      if (err.name.includes('ValidationError')) {
        throw new BadRequestError('Ошибка валидации данных');
      }
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
    Card.find({})
       /* .then((data) => res.status(200).send(data))
        .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));*/
        .then((data) => res.status(STATUS_OK).send(data))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
    Card.findById(req.params.cardId)
        // eslint-disable-next-line consistent-return
        /*.then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!' });
            }
            if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
                return res.status(403).send({ message: 'Невозможно удалить данную карточку' });
            }
            card.remove();
            res.status(200).send({ data: card });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(400).send({ message: 'Ошибка в id карточки' });
            }
            return res.status(500).send({ message: 'На сервере произошла ошибка' });
        });*/
        .then((card) => {
          if (!card) {
            throw new NotFoundError('Такой карточки нет!');
          }
          if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
            throw new BadRequestError('Невозможно удалить данную карточку');
          }
         // return Card.findByIdAndRemove(id);
         card.remove();
        })
        .then((card) => res.status(STATUS_OK).send({ data: card }))
        .catch(next);
};

module.exports.likeCard = (req, res, next) => {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
        /*.then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!' });
            }
            return res.status(200).send({ data: card });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(400).send({ message: 'Ошибка в id карточки' });
            }
            return res.status(500).send({ message: 'На сервере произошла ошибка' });
        });*/
        .then((card) => {
          if (!card) {
            throw new NotFoundError('Такой карточки нет!');
          }
          res.status(STATUS_OK).send({ data: card });
        })
        .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
        /*.then((card) => {
            if (!card) {
                return res.status(404).send({ message: 'Такой карточки нет!' });
            }
            return res.status(200).send({ data: card });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(400).send({ message: 'Ошибка в id карточки' });
            }
            return res.status(500).send({ message: 'На сервере произошла ошибка' });
        });*/
        .then((card) => {
          if (!card) {
            throw new NotFoundError('Такой карточки нет!');
          }
          res.status(STATUS_OK).send({ data: card });
        })
        .catch(next);
};
