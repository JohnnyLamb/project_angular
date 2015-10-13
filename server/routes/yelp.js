var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users.js');
var Event = require('../models/events.js').Event;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var yelp = require("yelp").createClient({
  consumer_key: "r1dTiEmacWU9r71Fi6VyoQ",
  consumer_secret: "nXDQbvdCWyrBRUvIHBuakp9bfwM",
  token: "4b7lgH7nhKdGR2JD_iDAXViXKaetjbec",
  token_secret: "zdQXksdnuzuB4yCZXBgwrn5psDs"
});
// GET ALL Events
router.get('/events/:term/:location', function(req, res, next) {
  var term = req.params.term;
  var location = req.params.location;
  yelp.search({
    term: term,
    limit: 20,
    location: location
  }, function(error, data) {
    if (error) {
      res.json({
        'message': error
      });
    } else {
      res.json(data.businesses);
    }
  });
});
// GET USER EVENT
router.get('/events/', function(req, res, next) {
  // console.log('hit');
  User.findById(req.session.user._id, function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

// DELETE SINGLE event
router.delete('/delete/:id', function(req, res, next) {
  // console.log(req.user)
  // console.log(req.params.id);
  Event.findById(req.user.id, function(err, data) {

    console.log("Oh Hey!");
    console.log(data);
    // console.log(req.user.events);
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});
// add single event
// router.post('/addEvent', function(req, res, next) {
//       console.log('hit');
//       // console.log(req.session.user._id);
//       var sessionID = req.session.user._id;
//       console.log(req.body.name);
//       console.log(req.body.location);
//       console.log(rating_img_url);

//       var newEvent = new Event({
//         name: "hey there!",
//         rating_img_url: "the pictures"
//       });
//       console.log(newEvent);
//       newEvent.saveQ();
//         console.log(newEvent);
//         User.findByIdAndUpdate(sessionID, {
//             $push: {
//               "events": newEvent
//             }
//           })
//           .then(function(result) {
//             res.json(result);
//           })
//           .catch(function(err) {
//             res.send(err + "this is the catch");
//           })
//           .done();
//       });



// add single event
router.post('/addEvent', function(req, res, next) {
  User.findById(req.session.user._id, function(err, user) {
    if (!err) {
      console.log('hit');
      // to check and see if something is in the db, if not, push
      var counter = 0;
      for (var i = 0; i < user.events.length; i++) {
        if (user.events[i].name.indexOf(req.body.name) !== -1) {
          counter++;
        }
      }
      if (counter === 0) {
        user.events.push(req.body);
      }
      // end logic on db
      user.save(function(err, data) {
        if (err) {
          res.json({
            'message': err
          });
        } else {
          res.json(data);
        }
      });
    }
  });
});



module.exports = router;
