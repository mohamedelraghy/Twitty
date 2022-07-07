const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title : {
    type: String,
    required: true,
  },
  content : {
    type: String,
    required: true
  }
});

mongoose.model('Post', postSchema);
