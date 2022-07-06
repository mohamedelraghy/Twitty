const express = require('express');
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
