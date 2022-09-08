const Post = require('../models/postModel');
const mongoose = require('mongoose');

// Get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createAt: -1});

    res.status(200).json(posts);
}


// Get a single post
const getPost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error: 'No such post'})
    }

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({msg: 'No such post'});
    }

    res.status(200).json(post);
}


// Create a new post
const createPost = async (req, res) => {
    const {title, author, field} = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!author) {
        emptyFields.push('author')
    }
    if (!field) {
        emptyFields.push('field')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill out all fields', emptyFields})
    }

    // Add doc to db
    try {
        const post = await Post.create({title, author, field})
        res.status(200).json(post)

    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// Delete a post
const deletePost = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error: 'No such post'})
    }

    const post = await Post.findByIdAndDelete({_id: id});

    if (!post) {
        return res.status(404).json({msg: 'No such post'});
    }

    res.status(200).json(post);

}

// Update a post

const updatePost = async (req, res) => {
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({error: 'No such post'})
    }

    const post = await Post.findByIdAndUpdate({_id: id}, {
        ...req.body
    });

    if (!post) {
        return res.status(404).json({msg: 'No such post'});
    }

    res.status(200).json(post);
}


module.exports = {
    
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
}