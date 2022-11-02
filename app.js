const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { createUser, login } = require('./controllers/users');
const { checkUser } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', checkUser, login);
app.post('/signup', checkUser, createUser);
app.use(express.json());
app.use(routes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Указанный путь не существует' });
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
