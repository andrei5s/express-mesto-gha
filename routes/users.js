const router = require('express').Router();
const { checkProfile, checkAvatar } = require('../middlewares/validation');
const auth = require('../middlewares/auth');

const {
  // createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
  createUser,

} = require('../controllers/users');

router.get('/', auth, getUser);

router.post('/', auth, createUser);

router.get('/:id', auth, getUserById);

router.patch('/:id', auth, checkProfile, updateProfile);

router.patch('/:id/avatar', auth, checkAvatar, updateAvatar);

module.exports = router;
