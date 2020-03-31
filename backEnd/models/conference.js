const mongoose = require('mongoose'); // since we are using mongoose we have to require it

const  conferenceSchema = new mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name : String,
  location : String,
  speakers :String,
  organisers : String,
  description : String,
  startDate : Date,
  endDate : Date,
  startTime : String,
  endTime : String,
  photoUrl : String,
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }
});

module.exports = mongoose.model('Conference', conferenceSchema);