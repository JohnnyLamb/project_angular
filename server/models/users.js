var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// USE MONGO $PUSH method to add events to eventsArray
var User = new Schema ({
  username:String,
  password:String,
  events:[]
});


User.plugin(passportLocalMongoose);
module.exports = mongoose.model('users',User);
