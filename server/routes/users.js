var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');

// GET ALL USERS
router.get('/users', function(req, res, next) {
  User.find(function(err,data){
    if(err){
      res.json({'message':err});
    } else {
      res.json(data);
    }
  });
});
// GET SINGLE USER

router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

// CREATE/POST USERS
router.post('/users',function(req,res,next){
  var newUser = new User ({
    username:req.body.username,
    password:req.body.password
  });
  newUser.save(function(err,data){
    if(err){
      res.json({'message':err});
    } else{
      res.json(data);
    }
  });
});

// PUT/UPDATE SINGLE USER
// put a beer
router.put('/user/:id', function(req, res, next) {
  var update = {
    username:req.body.username,
    password:req.body.password
  };
  User.findByIdAndUpdate(req.params.id, update, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});
// DELETE SINGLE USER
router.delete('/user/:id', function(req, res, next) {
  console.log(req.params.id);
  User.findByIdAndRemove(req.params.id, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
