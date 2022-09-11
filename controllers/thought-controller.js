const { Thought, User } = require('../models');

const thoughtController = {
    // /api/thoughts

    // all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .select('-_v')
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
        .select('-_v')
        .then((dbThoughtData) => {
            // if no thought is found, send 400
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create thought 
    createThought({ body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.status(400).json(err));
    },

    // update thought
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // create reaction
    createReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { push: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactionId: params.reactionId } },
            { new: true }
        )
        .then((dbThoughtData) => {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    }
};

module.exports = thoughtController;