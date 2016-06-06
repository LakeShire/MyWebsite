var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

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

router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();

    // form.uploadDir = "C:\\Users\\nali\\WebstormProjects\\angularjs\\tmp";
    form.uploadDir = "./tmp";
    form.maxFieldsSize = 1 * 1024 * 1024;
    form.keepExtensions = true;
    form.parse(req, function (err, fields, file) {
        var rename = fields['rename']
        var filePath = '';

        if(file.tmpFile){
            filePath = file.tmpFile.path;
        } else {
            for(var key in file){
                if( file[key].path && filePath==='' ){
                    filePath = file[key].path;
                    break;
                }
            }
        }

        // var targetDir = "C:\\Users\\nali\\WebstormProjects\\angularjs\\public\\images";
        var targetDir = "./public/images";
        if (!fs.existsSync(targetDir)) {
            fs.mkdir(targetDir);
        }
        var fileExt = filePath.substring(filePath.lastIndexOf('.'));
        if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
            var err = new Error('此文件类型不允许上传');
            res.json({ code:-1, message:'此文件类型不允许上传' });
        } else {
            var fileName = rename;
            var targetFile = path.join(targetDir, fileName);
            fs.rename(filePath, targetFile, function (err) {
                if (err) {
                    console.info(err);
                    res.json({ code:-1, message:'操作失败' });
                } else {
                    var fileUrl = '/images/' + fileName;
                    res.json({ code:0, fileUrl:fileUrl });
                }
            });

            // process.nextTick(function(){
            //     fs.unlink(filePath, function(err) {
            //         if (err) {
            //             console.info("删除上传时生成的临时文件失败");
            //             console.info(err);
            //         } else {
            //             console.info("删除上传时生成的临时文件");
            //         }
            //     });
            // });
        }
    });
});
module.exports = router;
