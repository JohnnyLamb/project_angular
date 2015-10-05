var express = require('express');
var router = express.Router();
var User = require('../models/users');

router.get('/users', function(req, res, next) {
  User.find(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

router.post('/users', function(req, res, next) {
  var newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
