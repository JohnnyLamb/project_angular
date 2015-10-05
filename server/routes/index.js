var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');

router.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('signup');
});

router.get('/register', function(req, res) {
  res.render('register');
});

// router.post('/', function(req, res, next) {
//   var newUser = new User({
//     username: req.body.username,
//     password: req.body.password
//   });
//   newUser.save(function(err, data) {
//     if (err) {
//       res.json({
//         'message': err
//       });
//     } else {
//       res.json(data);
//     }
//   });
// });

module.exports = router;
