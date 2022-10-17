const { Thought, User } = require("../models");

const userController = {
  // /api/users

<<<<<<< HEAD
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate('thoughts')
            .populate('friends')
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
            .populate('friends')
            .populate('thoughts')
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
=======
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .select("-_v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: "thoughts",
        select: "-_v",
      })
      .populate({
        path: "friends",
        select: "-_v",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
>>>>>>> 0fb3b4ef065fd64392248766fdb1249470543ae7

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update user
  updateUser({ body, params }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user is found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

<<<<<<< HEAD
    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true }
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
            { id: params.userId },
            { $pull: { friends: params.friendId } },
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
=======
  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { id: params.userId },
      { $push: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No friend found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // delete friend
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No friend found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};
>>>>>>> 0fb3b4ef065fd64392248766fdb1249470543ae7

module.exports = userController;
