var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var util = require('util');

var server = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var db = new mongodb.Db('user', server, {safe:true});

function isObjectValueEqual(a, b) {
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}

function removeByValue(arr, val) {
    for(var i = 0; i < arr.length; i++) {
        if (isObjectValueEqual(arr[i], val)) {
            arr.splice(i, 1);
            break;
        }
    }
}

db.open(function (err, db) {
    if (err) {
        console.log(err);
    }
});

router.post('/delete', function(req, res, next) {
    var body = req.body;
    var user = body['user'];
    var info = body['info'];
    db.createCollection('user', {safe:true}, function(err, collection) {
        if (err) {
            res.send({'ret' : -1});
        } else {
            collection.find({'name': user.name}).toArray(function (err, docs) {
                if (err == null) {
                    if (docs.length == 0) {
                        res.send({'ret' : -1, 'msg' : 'user not exist'});
                    } else {
                        user = docs[0];
                        if (user.collections == null) {
                            user.collections = [];
                        }
                        info = {'_id' : info._id, 'title' : info.title};
                        removeByValue(user.collections, info);
                        collection.save(user, function (err, data) {
                            if (err) {
                                res.send({'ret' : -1});
                            } else {
                                res.send({'ret' : 0, 'user' : user});
                            }
                        })
                    }
                } else {
                    res.send('Error');
                }
            })
        }
    });
});

router.post('/add', function(req, res, next) {
    var body = req.body;
    var user = body['user'];
    var info = body['info'];
    db.createCollection('user', {safe:true}, function(err, collection) {
        if (err) {
            res.send({'ret' : -1});
        } else {
            collection.find({'name': user.name}).toArray(function (err, docs) {
                if (err == null) {
                    if (docs.length == 0) {
                        res.send({'ret' : -1, 'msg' : 'user not exist'});
                    } else {
                        user = docs[0];
                        if (user.collections == null) {
                            res.send({'ret' : -1, 'msg' : 'no collections'});
                        } else {
                            user.collections.push({
                                '_id': info._id,
                                'title': info.title
                            });
                            collection.save(user, function (err, data) {
                                if (err) {
                                    res.send({'ret': -1});
                                } else {
                                    res.send({'ret': 0, 'user': user});
                                }
                            })
                        }
                    }
                } else {
                    res.send('Error');
                }
            })
        }
    });
});

module.exports = router;
