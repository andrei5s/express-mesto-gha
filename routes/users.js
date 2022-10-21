const router = require('express').Router();

const {
    createUser,
    getUser,
    getUserById,
    updateAvatar

} = require('../controllers/users');

router.get('/', getUser);

router.post('/', createUser);

router.get('/:id', getUserById);

router.patch('/avatar', updateAvatar);

module.exports = router;