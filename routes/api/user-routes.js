const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// GET all users & POST users
router 
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    
// GET User by id, PUT user to update, and DELETE user
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// GET user and friend by id, POST friend, and DELETE friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
