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
        });
      }
    });
  } else {
    console.log(err);
  }
});

router.get('/all.html', function(req, res, next) {
  res.render('user/all', { title: 'Express' });
});

router.get('/view.html', function(req, res, next) {
  res.render('user/view', { title: 'Express' });
});

router.get('/view_admin.html', function(req, res, next) {
  res.render('user/view_admin', { title: 'Express' });
});

router.get('/edit.html', function(req, res, next) {
  res.render('user/edit', { title: 'Express' });
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

router.post('/update', function(req, res, next) {
  var user = req.body;
  db.createCollection('user', { safe : true }, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      user._id = mongodb.ObjectId(user._id);
      collection.save(user, function (err, result) {
        if (err) {
          res.send('Error');
        } else {
          res.send(user._id + ' Update OK');
        }
      });
    }
  });
});

router.post('/logon', function (req, res, next) {
  var user = req.body;
  db.createCollection('user', {safe:true}, function (err, collection) {
    if (err) {
      res.send('Error');
    } else {
      collection.find({'name' : user.name}).toArray(function (err, docs) {
        if (err == null && docs.length == 1) {
          if (docs[0].password == user.password) {
            // res.send('Logon OK');
            res.send(docs[0]);
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

router.get('/all', function(req, res, next) {
  db.createCollection('user', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      collection.find().toArray(function (err, docs) {
        if (err != null) {
          res.send('Error');
        } else {
          res.send(docs);
        }
      })
    }
  });
});

router.post('/delete', function(req, res, next) {
  var user = req.body;
  db.createCollection('user', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      collection.remove({ '_id' : mongodb.ObjectId(user._id)});
      res.send('remove ' + user._id);
    }
  });
});

module.exports = router;
