const express = require('express');
// 3lbOUg8A879Ig4xQ
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://Moelraghy:3lbOUg8A879Ig4xQ@messageme.c12pk.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(() => {
    console.log('DB Connected Successfully');
  }).catch(() => {
    console.log('DB connection Failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, POTIONS"
  );
  next();
})

app.post('/api/posts', (req, res, next) =>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save();

  res.status(201).json({
    messege : 'Post added Successfully',
  });
});


app.get('/api/posts', (req, res, next) => {

  Post.find()
    .then(docs => {
      res.status(200).json({
        messege: "Posts fetched succesfully!",
        posts: docs
    });
  });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({
      messege: "post deleted successfully"
    });
  });
});

module.exports = app;
