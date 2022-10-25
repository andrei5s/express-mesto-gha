 const mongoose = require('mongoose');
 const User = require('../models/user');

 const createUser = (req, res) => {
     User.create(req.body)
         .then((user) => {
             res.status(201).send(user);
         })
         .catch((err) => {
             if (err instanceof mongoose.Error.ValidationError) {
                 return res.status(400).send({ message: 'Ошибка валидации', err });
             }
             return res.status(500).send({ message: 'На сервере произошла ошибка', err });
         });
 };

 const getUser = async(req, res) => {
     try {
         const users = await User.find({});
         res.send({ data: users });
     } catch (err) {
         return res.status(500).send({ message: 'На сервере произошла ошибка', err });
     }
 };

 const getUserById = (req, res) => {
     User.findById(req.params.id).orFail(new Error('NotFound'))
         .then((user) => {
             return res.send(user);
         })
         .catch((err) => {
             if (err.message === 'NotFound') {
                 return res.status(404).send({ message: 'Пользователь не найден' });
             }
             if (err instanceof mongoose.Error.CastError) {
                 return res.status(400).send({ message: 'Не корректный _id', err });
             }
             return res.status(500).send({ message: 'На сервере произошла ошибка', err });
         });
 };

 const updateProfile = (req, res) => {
     const { name, about } = req.body;
     User.findByIdAndUpdate(
             req.user._id, { name, about }, { new: true, runValidators: true },
         )
         .then((user) => res.status(200).send({ data: user }))
         .catch((err) => {
             if (err.message === 'NotFound') {
                 return res.status(400).send({ message: 'Пользователь не найден' });
             }
             if (err instanceof mongoose.Error.CastError) {
                 return res.status(400).send({ message: 'Не корректный _id', err });
             }
             if (err instanceof mongoose.Error.ValidationError) {
                 return res.status(400).send({ message: 'Ошибка валидации', err });
             }
             return res.status(500).send({ message: 'На сервере произошла ошибка', err });
         });
 };

 /*const updateUser = async(req, res) => {
     try {
         const user = await User.findById(req.params.id);
         if (!user) {
             return res.status(400).send({ message: 'Пользователь не найден' });
         }
         const newUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
         res.send(newUser);
     } catch (err) {
         return res.status(500).send({ message: 'На сервере произошла ошибка', err });
     }
 }*/


 const updateAvatar = (req, res) => {
     const { avatar } = req.body;
     User.findByIdAndUpdate(
             req.user._id, { avatar }, { new: true, runValidators: true },
         )
         .then((user) => res.send({ data: user }))
         .catch((err) => {
             if (!user) {
                 return res.status(400).send({ message: 'Пользователь не найден' });
             }
             return res.status(500).send({ message: 'На сервере произошла ошибка', err });
         });
 };

 module.exports = {
     createUser,
     getUser,
     getUserById,
     updateProfile,
     // updateUser,
     updateAvatar
 }