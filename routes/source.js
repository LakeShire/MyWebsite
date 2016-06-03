var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var db = new mongodb.Db('discount', server, {safe:true});

db.open(function (err, db) {
  if (err) {
    console.log(err);
  }
});

router.get('/', function(req, res, next) {
  res.render('source', { title: 'Express' });
});

router.get('/add.html', function(req, res, next) {
  res.render('source/add', { title: 'Express' });
});

router.get('/all.html', function(req, res, next) {
  res.render('source/all', { title: 'Express' });
});

router.get('/view.html', function(req, res, next) {
    res.render('source/view', { title: 'Express' });
});

router.get('/edit.html', function(req, res, next) {
    res.render('source/edit', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
  source = req.body;
  db.createCollection('sources', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      if (source._id == null) {
        collection.insert(source);
        res.send(source._id);
      } else {
        source._id = mongodb.ObjectId(source._id);
        collection.save(source);
        res.send(source._id);
      }
    }
  });
});

router.post('/delete', function(req, res, next) {
    source = req.body;
    db.createCollection('sources', {safe:true}, function(err, collection){
        if (err) {
            res.send('Error');
        } else {
            collection.remove({ '_id' : mongodb.ObjectId(source._id)});
            res.send('remove ' + source._id);
        }
    });
});

router.get('/all', function(req, res, next) {
  db.createCollection('sources', {safe:true}, function(err, collection){
    if (err) {
      res.send('Error');
    } else {
      collection.find().toArray(function (err, docs) {
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

module.exports = router;
