const express = require('express');

const app = express();


app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'srgladsf',
      title: 'Hello',
      content: "Hello from the other side"
    }
  ];
  return res.status(200).json({
    messege: "Posts fetched succesfully!",
    posts: posts
  });
});

module.exports = app;
