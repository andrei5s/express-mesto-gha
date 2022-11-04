const router = require('express').Router();
const { checkProfile, checkAvatar, checkUserById } = require('../middlewares/validation');
// const auth = require('../middlewares/auth');

const {
  // createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,

} = require('../controllers/users');

router.get('/', getUser);

// router.post('/', auth, createUser);

router.get('/:id', checkUserById, getUserById);

router.patch('/me', checkProfile, updateProfile);

router.patch('/me/avatar', checkAvatar, updateAvatar);

module.exports = router;
