const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ExistError = require('../errors/existerr');
const BadRequestError = require('../errors/bedrequserror');
const BadDataError = require('../errors/beddataerr');
const NotFoundError = require('../errors/not-found-err');
const { STATUS_OK, STATUS_CREATED } = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Нужны почта и пароль');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ExistError('Такой пользователь уже существует!');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res
      .status(STATUS_CREATED)
    // .send({ _id: user._id, email: user.email }))
      .send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch(() => {
      throw new BadDataError('Неправильные почта или пароль');
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
/* const getUser = async(req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } // catch (err) {
    // return res.status(500).send({ message: 'На сервере произошла ошибка' });
 // }
}; */

const getUser = (req, res, next) => {
  User.find({})
    .then((users) => res.status(STATUS_OK).send(users))
    .catch(next);
};

/* const getUserById = (req, res) => {
  User.findById(req.params.id).orFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      if (err instanceof mongoose.Error.CastError) {
        return res.status(400).send({ message: 'Не корректный _id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
}; */

const getUserById = (req, res, next) => {
  User.findById(req.params.id).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_OK).send({ data: user });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  // eslint-disable-next-line max-len
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true, upsert: true })
  // eslint-disable-next-line consistent-return
  /* .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'Пользователь не найден' });
            }
            res.status(200).send({ data: user });
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.CastError) {
                return res.status(400).send({ message: 'Не корректный _id' });
            }
            if (err instanceof mongoose.Error.ValidationError) {
                return res.status(400).send({ message: 'Ошибка валидации' });
            }
            return res.status(500).send({ message: 'На сервере произошла ошибка' });
        }); */
    .then((user) => res.status(STATUS_OK).send({ user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
  // eslint-disable-next-line consistent-return
  /* .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'Пользователь не найден' });
            }
            res.send({ data: user });
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
                return res.status(400).send({ message: 'Ошибка валидации' });
            }
            return res.status(500).send({ message: 'На сервере произошла ошибка' });
        }); */
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch(next);
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
};
