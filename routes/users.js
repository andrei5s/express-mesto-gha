const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,

} = require('../controllers/users');

router.get('/', auth, getUser);

router.post('/', createUser);

router.get('/:id', auth, getUserById);

router.patch('/:id', auth, updateProfile);

router.patch('/:id/avatar', auth, updateAvatar);

module.exports = router;
