const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// GET all users & PUT, POST, DELETE users
router 
    .route('/')
    .get(getAllUsers)
    .get(getUserById)
    .put(updateUser)
    .post(createUser)
    .delete(deleteUser);

// GET user and friend by id, POST friend, and DELETE friend
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;