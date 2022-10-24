const router = require('express').Router();

const {
    createUser,
    getUser,
    getUserById,
    updateProfile,
    //updateUser,
    updateAvatar

} = require('../controllers/users');

router.get('/', getUser);

router.post('/', createUser);

router.get('/:id', getUserById);

router.patch('/:id', updateProfile);
//router.patch('/:id', updateUser);

router.patch('/:id/avatar', updateAvatar);


module.exports = router;