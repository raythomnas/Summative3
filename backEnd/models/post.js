const mongoose = require('mongoose'); // since we are using mongoose we have to require it


const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  conferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conference'
  },
  userName: String,
  userImage: String,
  text: String,
  postImage: String
});

module.exports = mongoose.model('Post', postSchema);