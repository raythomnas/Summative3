const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  commentSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  conferenceId: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Conference'
  },
  postId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Post'
  },
  userName: String,
  userImage: String,
  text : String,
  imageUrl : String
});
module.exports = mongoose.model('Comment', commentSchema);

