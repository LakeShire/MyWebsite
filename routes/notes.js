var express = require('express');
var router = express.Router();
var util = require('util');
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var db = new mongodb.Db('notes', server, {safe:true});

db.open(function (err, db) {
  if (!err) {
    db.createCollection('notes', {safe:true}, function(err, collection){
      if (err) {
        console.log(err);
      } else {
        collection.find().toArray(function(err, docs){
          console.log('======notes======');
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

router.post('/add', function(req, res, next) {
  note = req.body;
  db.createCollection('notes', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      if (note._id == null) {
        collection.insert(note);
        res.send(note._id);
      } else {
        note._id = mongodb.ObjectId(note._id);
        collection.save(note);
        res.send(note._id);
      }
    }
  });
});

router.get('/list/:user', function(req, res, next) {
  db.createCollection('notes', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      collection.find({'author' : req.params.user}).toArray(function (err, docs) {
        console.log(docs);
        if (err != null) {
          res.send('Error');
        } else {
          console.log(docs);
          res.send(docs);
        }
      })
    }
  });
});

router.post('/delete', function(req, res, next) {
  note = req.body;
  console.log('======delete======')
  db.createCollection('notes', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      collection.remove({'_id' : mongodb.ObjectId(note._id)});
    }
  });
});

router.post('/logon', function (req, res, next) {
  console.log('Logon');
  user = req.body;
  db.createCollection('user', {safe:true}, function (err, collection) {
    if (err) {
      res.send('Error');
    } else {
      collection.find({'name' : user.name}).toArray(function (err, docs) {
        if (err == null && docs.length == 1) {
          if (docs[0].password == user.password) {
            res.send('Logon OK');
          } else {
            res.send('Password Error');
          }
        } else {
          res.send('User not exist');
        }
      });
    }
  })
});

module.exports = router;
