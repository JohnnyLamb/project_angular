var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

// USE MONGO $PUSH method to add events to eventsArray


// var Event = new Schema ({
//   name:String ,
//   location:Object,
//   rating_img_url:String ,
// });

var User = new Schema ({
  username:{type:String,unique:true},
  password:String,
  events: []
});

// User.plugin(uniqueValidator);
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('users',User);
