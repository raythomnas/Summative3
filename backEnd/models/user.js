const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  userSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  username : String,
  email : String,
  password : String,
  imageUrl : String
});

module.exports = mongoose.model('User', userSchema);