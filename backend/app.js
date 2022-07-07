const express = require('express');
73PIVhPYvBWMasSo
const bodyParser = require('body-parser');

const app = express();

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
  const post = req.body;
  console.log(post);
  res.status(201).json({
    messege : 'Post added Successfully',
  });
});


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
