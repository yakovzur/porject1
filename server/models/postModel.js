const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
