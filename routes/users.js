const router = require('express').Router();
const { checkProfile, checkAvatar } = require('../middlewares/validation');

const {
 // createUser,
  getUser,
  getUserById,
  updateProfile,
  updateAvatar,

} = require('../controllers/users');

router.get('/', getUser);

//router.post('/', createUser);

router.get('/:id', getUserById);

router.patch('/:id', checkProfile, updateProfile);

router.patch('/:id/avatar', checkAvatar, updateAvatar);

module.exports = router;
