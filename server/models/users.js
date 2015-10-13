var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var Event = require('../models/events.js');




var Event = new Schema ({
  name:String ,
  rating_img_url:String ,
});

var User = new Schema ({
  username:{type:String,unique:true},
  password:String,
  events: [Event]
});


User.plugin(passportLocalMongoose);
module.exports = mongoose.model('users',User);
// var Event= mongoose.model('events',Event);
// var User= mongoose.model('users',User);
// module.exports = {
//   Event:Event,
//   User: User
// };
