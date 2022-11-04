const router = require('express').Router();
const { checkProfile, checkAvatar, checkUserById } = require('../middlewares/validation');
// const auth = require('../middlewares/auth');

const {
  // createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser,

} = require('../controllers/users');

router.get('/', getUser);

// router.post('/', auth, createUser);

router.get('/me', checkUserById, getCurrentUser);
router.get('/:id', checkUserById, getUserById);

router.patch('/:id', checkProfile, updateProfile);

router.patch('/:id/avatar', checkAvatar, updateAvatar);

module.exports = router;
