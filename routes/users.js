var express = require('express');
var router = express.Router();
var util = require('util');
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var db = new mongodb.Db('user', server, {safe:true});

db.open(function (err, db) {
  if (!err) {
    db.createCollection('user', {safe:true}, function(err, collection){
      if (err) {
        console.log(err);
      } else {
        collection.find().toArray(function(err, docs){
          console.log(docs);
        });
      }
    });
  } else {
    console.log(err);
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/logon', function(req, res, next) {
  var user = req.body;
  console.log(util.parse(user));
  // db.createCollection('user', {safe:true}, function(err, collection){
  //   if (err) {
  //     res.send('Error');
  //   } else {
  //     collection.find({'name' : user.name}).toArray(function (err, docs) {
  //       if (err || docs.length != 0) {
  //         res.send('Error');
  //       } else {
  //         collection.insert(user);
  //         res.send('Add User OK');
  //       }
  //     });
  //   }
  // });
});

router.post('/add', function(req, res, next) {
  var user = req.body;
  db.createCollection('user', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      collection.find({'name' : user.name}).toArray(function (err, docs) {
        if (err || docs.length != 0) {
          res.send('Error');
        } else {
          collection.insert(user);
          res.send('Add User OK');
        }
      });
    }
  });
});

module.exports = router;
