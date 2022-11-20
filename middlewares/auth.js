const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const BadDataError = require('../errors/beddataerr');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new BadDataError('Необходима авторизация'));
  }

  // const token = extractBearerToken(authorization);
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // payload = jwt.verify(token, 'super-strong-secret');
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new BadDataError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
