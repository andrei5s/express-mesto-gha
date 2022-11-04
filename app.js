const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const { checkUser, checkLogin } = require('./middlewares/validation');
const { ERROR_SERVER } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup', checkUser, createUser);
app.post('/signin', checkLogin, login);
app.use(routes);

// app.use(express.json());

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Указанный путь не существует' });
});

// Обработка ошибок celebrate
app.use(errors());

// Централизованная обработка ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = ERROR_SERVER, message } = err;
  const errorMessage = (statusCode === ERROR_SERVER) ? 'Ошибка на сервере' : message;
  res.status(statusCode).send({ message: errorMessage });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
