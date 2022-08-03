const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const { env } = require('process');

const app = express();

mongoose.connect("mongodb+srv://Moelraghy:"+ process.env.MONGO_ATLAS_PW +"@messageme.c12pk.mongodb.net/node-angular?w=majority")
  .then(() => {
    console.log('DB Connected Successfully');
  }).catch(() => {
    console.log('DB connection Failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, POTIONS"
  );
  next();
})

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);


module.exports = app;
