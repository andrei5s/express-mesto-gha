const allowedCors = [
  'https://project.andrei5s.nomoredomains.icu',
  'http://project.andrei5s.nomoredomains.icu',
  'https://api.project.andrei5s.nomoredomains.icu',
  'http://api.project.andrei5s.nomoredomains.icu',
  'https://project.andrei5s.nomoredomains.icu/users',
  'https://project.andrei5s.nomoredomains.icu/users/me',
  'http://localhost:3000',
  'http://localhost:3001',
];

// eslint-disable-next-line consistent-return
const corsOption = ((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
});

module.exports = corsOption;
