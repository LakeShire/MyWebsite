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

router.get('/all_admin.html', function(req, res, next) {
    res.render('info/all_admin', { title: 'Express' });
});

router.get('/view_admin.html', function(req, res, next) {
    res.render('info/view_admin', { title: 'Express' });
});

router.get('/edit.html', function(req, res, next) {
    res.render('info/edit', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
    var info = req.body;
    db.createCollection('sources', {safe:true}, function(err, collection) {
        if (err) {
            res.send('Error');
        } else {
            collection.find({'name': info.source}).toArray(function (err, docs) {
                if (err == null) {
                    if (docs.length == 0) {
                        source = {name: info.source, description: '', pic: ''};
                        collection.insert(source);
                    } else {
                        source = docs[0];
                    }

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

router.post('/delete', function(req, res, next) {
    info = req.body;
    db.createCollection('notes', {safe:true}, function(err, collection){
        if (err) {
            res.send('Error');
        } else {
            collection.remove({ '_id' : mongodb.ObjectId(info._id)});
            res.send('remove ' + info._id);
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
          res.send(docs);
        }
      })
    }
  });
});

var PAGE_SIZE = 20;

router.get('/infos', function(req, res, next) {
    var source = req.param('source');
    var pageId = req.param('pageId');
    var pageSize = req.param('pageSize');
    pageId = pageId == null ? 0 : pageId;
    pageSize = pageSize == null ? PAGE_SIZE : pageSize;

    db.createCollection('notes', {safe:true}, function(err, collection){
        if (err) {
            var result = {
                'ret' : -1,
                'msg' : 'Error'
            };
            res.send(result);
        } else {
            if (source != null) {
                collection.find({'source.name' : source}).toArray(function (err, docs) {
                    if (err != null) {
                        var result = {
                            'ret' : -1,
                            'msg' : 'Error'
                        };
                        res.send(result);
                    } else {
                        var total = docs.length;
                        var page = total / pageSize;
                        var totalPage;
                        if (page % 1 === 0) {
                            totalPage = page;
                        } else {
                            totalPage = Math.floor(page) + 1;
                        }
                        collection.find({ 'source.name' : source }).limit(pageSize * 1).skip(pageId * pageSize).toArray(function(err, docs) {
                            if (err != null) {
                                var result = {
                                    'ret': -1,
                                    'msg': 'Error'
                                };
                                res.send(result);
                            } else {
                                var result = {
                                    'ret': 0,
                                    'total': total,
                                    'totalPage': totalPage,
                                    'pageSize' : pageSize,
                                    'pageId': pageId,
                                    'infos': docs
                                };
                                res.send(result);
                            }
                        });
                    }
                })
            } else {
                collection.find().toArray(function (err, docs) {
                    if (err != null) {
                        var result = {
                            'ret' : -1,
                            'msg' : 'find infos error'
                        };
                        res.send(result);
                    } else {
                        var total = docs.length;
                        var page = total / pageSize;
                        var totalPage;
                        if (page % 1 === 0) {
                            totalPage = page;
                        } else {
                            totalPage = Math.floor(page) + 1;
                        }
                        collection.find().limit(pageSize * 1).skip(pageId * pageSize).toArray(function(err, docs) {
                           if (err != null) {
                               var result = {
                                   'ret' : -1,
                                   'msg' : 'Error'
                               };
                               res.send(result);
                           } else {
                               var result = {
                                   'ret' : 0,
                                   'total' : total,
                                   'totalPage' : totalPage,
                                   'pageSize' : pageSize,
                                   'pageId' : pageId,
                                   'infos' : docs
                               };
                               res.send(result);
                           }
                        });
                    }
                })
            }
        }
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    db.createCollection('notes', {safe:true}, function(err, collection){
        if (err) {
            res.send('Error');
        } else {
            collection.find({'_id' : mongodb.ObjectId(id)}).toArray(function (err, docs) {
                if (err != null) {
                    res.send('Error');
                } else {
                    res.send(docs);
                }
            })
        }
    });
});

module.exports = router;
