const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const BadDataError = require('../errors/beddataerr');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    minlength: 2,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        // eslint-disable-next-line no-useless-escape
        return /https?:\/\/(www)?[\-\.~:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/gi.test(v);
      },
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
}, {
  versionKey: false,
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new BadDataError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new BadDataError('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
