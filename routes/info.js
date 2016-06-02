var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var db = new mongodb.Db('discount', server, {safe:true});

db.open(function (err, db) {
  if (!err) {
    db.createCollection('info', {safe:true}, function(err, collection){
      if (err) {
        console.log(err);
      } else {
        collection.find().toArray(function(err, docs){
          console.log('======info======');
          console.log(docs);
        });
      }
    });
  } else {
    console.log(err);
  }
});

router.get('/', function(req, res, next) {
  res.render('info', { title: 'Express' });
});

router.get('/add.html', function(req, res, next) {
  res.render('info/add', { title: 'Express' });
});

router.get('/all.html', function(req, res, next) {
  res.render('info/all', { title: 'Express' });
});

router.get('/view.html', function(req, res, next) {
    res.render('info/view', { title: 'Express' });
});

router.get('/edit.html', function(req, res, next) {
    res.render('info/edit', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    info = req.body;
    console.log(info);
  db.createCollection('sources', {safe:true}, function(err, collection) {
      if (err) {
          res.send('Error');
      } else {
          collection.find({'name': info.source}).toArray(function (err, docs) {
              console.log('get source where name is ' + info.source + ' : ');
              console.log(docs);
              if (err == null) {
                  if (docs.length == 0) {
                      source = {name: info.source, description: '', pic: ''};
                      collection.insert(source);
                  } else {
                      source = docs[0];
                  }

                  console.log('source: ' + source);
                  info.source = source;
                  db.createCollection('notes', {safe: true}, function (err, collection) {
                      if (err) {
                          res.send('Error');
                      } else {
                          if (info._id == null) {
                              collection.insert(info);
                              res.send(info._id);
                          } else {
                              info._id = mongodb.ObjectId(info._id);
                              collection.save(info);
                              res.send(info._id);
                          }
                      }
                  });
              }
          })
      }
  });

});

router.get('/all', function(req, res, next) {
  db.createCollection('notes', {safe:true}, function(err, collection){
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
