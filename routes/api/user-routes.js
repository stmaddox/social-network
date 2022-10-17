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

<<<<<<< HEAD
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
=======
// GET all users & PUT, POST, DELETE users
router.route("/").get(getAllUsers).post(createUser);

// Get User by id, update user, delete user
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);
>>>>>>> 0fb3b4ef065fd64392248766fdb1249470543ae7

// GET user and friend by id, POST friend, and DELETE friend
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
