const { celebrate, Joi } = require('celebrate');
const url = require('./url-validator');

const checkUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    // avatar: Joi.string().pattern(/https?:\/\/(www)?[\-\.~:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/),
    // eslint-disable-next-line no-undef
    avatar: Joi.string().custom(url, 'url validation'),
  }),
});

const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const checkAvatar = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    // avatar: Joi.string().required().pattern(/https?:\/\/(www)?[\-\.~:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/),
    // eslint-disable-next-line no-undef
    avatar: Joi.string().required().custom(url, 'url validation'),
  }),
});

const checkUserById = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().alphanum()
      .length(24),
  }),
});

const checkNewCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    // link: Joi.string().required().pattern(/https?:\/\/(www)?[\-\.~:\/\?#\[\]@!$&'\(\)*\+,;=\w]+#?\b/),
    // eslint-disable-next-line no-undef
    link: Joi.string().required().custom(url, 'url validation'),
  }),
});

const checkCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().alphanum()
      .length(24),
  }),
});

const checkDeletedCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().alphanum()
      .length(24),
  }),
});

module.exports = {
  checkUser,
  checkLogin,
  checkProfile,
  checkAvatar,
  checkUserById,
  checkNewCard,
  checkCardId,
  checkDeletedCardId,
};
