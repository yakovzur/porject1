const express = require("express");
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

// express app
const app = express();

/* Un mark before deployment*/

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

// routes
app.use('/api/posts', postRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err);
    })



