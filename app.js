const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
    req.user = {
        _id: '635171dafe5042ccd5fc3940' // вставьте сюда _id созданного в предыдущем пункте пользователя
    };

    next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});