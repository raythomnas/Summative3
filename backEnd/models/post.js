const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  postSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  authorId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'User'
  }
  text : String,
  imageUrl : String
});

module.exports = mongoose.model('Post', postSchema);