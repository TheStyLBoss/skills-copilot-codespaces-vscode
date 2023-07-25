//Create a web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const Post = require('./models/post');
const cors = require('cors');

app.use(cors());

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comment', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Get all comments
app.get('/api/comments', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

//Get a comment by id
app.get('/api/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

//Create a comment
app.post('/api/comments', async (req, res) => {
    const comment = new Comment({
        content: req.body.content,
        post: req.body.post
    });
    await comment.save();
    res.send(comment);
});

//Update a comment
app.put('/api/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id,
        {
            content: req.body.content,
            post: req.body.post
        }, { new: true });
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

//Delete a comment
app.delete('/api/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given ID was not found.');
    res.send(comment);
});

//Get all posts
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

//Get a post by id
app.get('/api/posts/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) return req.status(404).send('The post with the given ID was not found.');
    res.send(post);
});

//Create a post
app.post('/api/posts', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await post.save();
    res.send(post);
}
);

//Update a post
app.put('/api/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            content: req.body.content
        }, { new: true });
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    res.send(post);
}
);

//Delete a post
app.delete('/api/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);
    if (!post) return res.status(404).send('The post with the given ID was not found.');
    res.send(post);
}
);

//Listen to port 3000
app.listen(3000, () => console.log('Listening on port 3000...'));

