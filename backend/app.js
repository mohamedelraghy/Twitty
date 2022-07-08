const express = require('express');
// 3lbOUg8A879Ig4xQ
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');

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
    "GET, POST, PATCH, PUT, DELETE, POTIONS"
  );
  next();
})

app.use("/api/posts",postRoutes);


module.exports = app;
