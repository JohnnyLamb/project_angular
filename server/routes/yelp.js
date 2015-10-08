var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users.js');

var yelp = require("yelp").createClient({
  consumer_key: "r1dTiEmacWU9r71Fi6VyoQ",
  consumer_secret: "nXDQbvdCWyrBRUvIHBuakp9bfwM",
  token: "4b7lgH7nhKdGR2JD_iDAXViXKaetjbec",
  token_secret: "zdQXksdnuzuB4yCZXBgwrn5psDs"
});

// GET ALL USERS
router.get('/events/:term/:location', function(req, res, next) {
  var term = req.params.term;
  var location = req.params.location;
  yelp.search({
    term: term,
    limit: 20,
    location: location
  }, function(error, data) {
    if(error){
      res.json({'message':error});
    } else{
       console.log(data);
      res.json(data.businesses);
    }
  });
});

// // PUT/UPDATE SINGLE Event
// router.put('/events/:term/:location', function(req, res, next) {
//   var event = {
//     event:req.body.event,

//   };
//   User.findByIdAndUpdate(req.params.id, event, function(err, data){
//     if(err){
//       res.json({'message': err});
//     } else {
//       res.json(data);
//     }
//   });
// });


module.exports = router;
