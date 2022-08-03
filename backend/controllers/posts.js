const Post = require('../models/post');

exports.createPost = (req, res, next) =>{
  const url = req.protocol + '://' + req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });


  post.save().then(createdPost => {
    res.status(201).json({
      messege : 'Post added Successfully',
      post: {
        ...createdPost,
        id: createdPost.id,
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating a Post failded!'
    });
  });
}

exports.listPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentpage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentpage){
    postQuery
      .skip(pageSize * (currentpage - 1))
      .limit(pageSize)
  }

  postQuery.find()
  .then(docs => {
    fetchedPosts = docs;
    return Post.count();
  })
  .then(count => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      maxPosts: count
    })
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Posts Failed!"
    });
  });
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    }else{
      res.status(404).json({
        message: "Post not found"
      })
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching Post Failed!"
    });
  });
}

exports.editPost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    connect: req.body.connect,
    imagePath: imagePath,
    creator: req.userData.userId,
  });

  Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then( result => {

    if(result.modifiedCount > 0)
      res.status(200).json({ messege: "post update successfully" });
    else
      res.status(401).json({ messege: "Not Authorized!" });
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't update post!"
    });
  })
}

exports.removePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then( result => {

    if(result.deletedCount > 0)
      res.status(200).json({ messege: "Deletion successfully" });
    else
      res.status(401).json({ messege: "Not Authorized!" });
  }).catch(error => {
    res.status(500).json({
      message: "Cannot Delet a Post!"
    });
  });
}
