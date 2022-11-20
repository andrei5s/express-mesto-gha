const jwt = require('jsonwebtoken');
const BadDataError = require('../errors/beddataerr');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const YOUR_JWT = 'jwt'; // вставьте сюда JWT, который вернул публичный сервер
  const SECRET_KEY_DEV = process.env; // вставьте сюда секретный ключ для разработки из кода
  try {
    const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
    console.log('\x1b[31m%s\x1b[0m', `
  Надо исправить. В продакшне используется тот же
  секретный ключ, что и в режиме разработки.
  `);
  } catch (err) {
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log(
        '\x1b[32m%s\x1b[0m',
        'Всё в порядке. Секретные ключи отличаются',
      );
    } else {
      console.log(
        '\x1b[33m%s\x1b[0m',
        'Что-то не так',
        err,
      );
    }
  }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new BadDataError('Необходима авторизация'));
  }

  // const token = extractBearerToken(authorization);
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    return next(new BadDataError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
