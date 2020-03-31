const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  commentSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  authorId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'User'
  }
  postId : {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'Post'
  }
  text : String,
  imageUrl : String
});
Comment', commentSchema);