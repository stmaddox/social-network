const { Thought, User } = require('../models');

const userController = {
    // /api/users

    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-_v')
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get user by id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-_v'
            })
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // update user
    updateUser({ body, params }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with that id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id },
            { new: true }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user is found with this id!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // add friend
    addFriend({ params, }, res) {
        User.findOneAndUpdate(
            { id: params.id },
            { $push: { friends: params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No friend found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No friend found with this id' });
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    }
}

module.exports = userController;