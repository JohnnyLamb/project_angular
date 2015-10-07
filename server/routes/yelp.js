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
    location: location
  }, function(error, data) {
    if(error){
      res.json({'message':error});
    } else{
       console.log(data);
      res.json(data["businesses"]);
    }
  });
});


module.exports = router;
