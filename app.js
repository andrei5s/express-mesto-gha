const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
    req.user = {
        _id: '63577c790ec6c2c886163bb7' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});

app.use(express.json());
app.use(routes);
app.use('*', (req, res) => {
    res.status(404).send({ message: 'Указанный путь не существует' });
})
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});