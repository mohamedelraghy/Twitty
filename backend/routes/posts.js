const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('', (req, res, next) =>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost => {
    res.status(201).json({
    messege : 'Post added Successfully',
    postId: createdPost._id,
    });
  });


});


router.get('', (req, res, next) => {

  Post.find()
    .then(docs => {
      res.status(200).json({
        messege: "Posts fetched succesfully!",
        posts: docs
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    }else{
      res.status(404).json({
        message: "Post not found"
      })
    }
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    connect: req.body.connect
  });
  Post.updateOne({_id: req.params.id}, post).then( result => {
    res.status(200).json({
      messege: "post update successfully"
    });
  })
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id}).then( result => {
    console.log(result);
    res.status(200).json({
      messege: "post deleted successfully"
    });
  });
});


module.exports = router;
