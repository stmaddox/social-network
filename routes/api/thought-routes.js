const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// GET all and POST at /api/thoughts
router 
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// GET one, PUT (Update), Delete Thoughts /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);