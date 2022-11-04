const jwt = require('jsonwebtoken');
const BadDataError = require('../errors/beddataerr');

const handleAuthError = () => {
  throw new BadDataError('Необходима авторизация');
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  // const token = extractBearerToken(authorization);
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  next();
};
