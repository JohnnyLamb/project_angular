var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users.js');

router.get('/:username', function(req, res, next) {
  console.log(req.session)
  User.findOne({username:req.params.username}, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

router.post('/:username/event', function(req, res, next) {
  var update = {
    events:[req.body.event]
  };
  User.findOneAndUpdate({username:req.params.username},update, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    passport.authenticate('local')(req, res, function() {
      return res.status(200).json({
        status: 'Registration successful!'
      });
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.session.user = user;
      res.status(200).json({
        status: 'Login successful!',
        user: user
      });
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});



module.exports = router;
