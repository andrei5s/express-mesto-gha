const router = require('express').Router();
const { checkProfile, checkAvatar, checkUserById } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const {
  // createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,

} = require('../controllers/users');

router.get('/', getUser);

// router.post('/', auth, createUser);

router.get('/:id', auth, checkUserById, getUserById);

router.patch('/:id', auth, checkProfile, updateProfile);

router.patch('/:id/avatar', auth, checkAvatar, updateAvatar);

module.exports = router;
