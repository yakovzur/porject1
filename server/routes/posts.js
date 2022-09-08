const express = require('express');
const { 
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
} = require('../controllers/postController');


const router = express.Router();


// Get all workouts
router.get('/', getPosts);

// Get one workout
router.get('/:id', getPost);

// Post a new workout
router.post('/', createPost);


// Delete a workout
router.delete('/:id', deletePost);

// Update a workout
router.patch('/:id', updatePost);

module.exports = router;