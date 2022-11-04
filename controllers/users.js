const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
      .send({ _id: user._id, email: user.email }))
    // .send(user))
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
const getUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send({ data: users });
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id).select('+password')
  // .then((user) => res.send(user))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        // return res.status(400).send({ message: 'Не корректный _id' });
        throw new BadRequestError('Не корректный _id');
      }
      // return res.status(500).send({ message: 'На сервере произошла ошибка' });
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  // eslint-disable-next-line max-len
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true, upsert: true })
  // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        // return res.status(400).send({ message: 'Ошибка валидации' });
        throw new BadRequestError('Ошибка валидации');
      }
      // return res.status(500).send({ message: 'На сервере произошла ошибка' });
      next(err);
    });
};

module.exports = {
  createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
  login,
};
