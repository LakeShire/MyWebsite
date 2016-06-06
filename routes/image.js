var express = require('express');
var fs = require('fs');
var path = require('path');

var router = express.Router();

// router.get('/:id', function(req, res, next) {
//   // var path = "C:\\Users\\nali\\WebstormProjects\\angularjs\\images\\" + req.params.id;
//   var path = "../images/" + req.params.id;
//   fs.exists(path, function(exists){
//     if(!exists) {
//       throw err;
//     } else {
//       fs.readFile(path, function(err, data){
//         if (err) {
//           throw err;
//         } else {
//           function onRequest(req, res){
//             // 取得文件路径
//             var pathname = url.parse(req.url).pathname;
//             // 获取文件扩展名(包含前置.)
//             var extname = path.extname(pathname);
//             var type = extname.slice(1);
//             // 获取下载文件在磁盘上的路径，
//             var realPath = config.root + pathname;
//             if (extname === '') {
//               res.writeHead(200, {'Content-Type':'text/html'});
//               res.write(data);
//               res.end();
//             } else {
//               FServer.filesLoad(realPath, type, req, res);
//             }
//           }
//         }
//       });
//     }
//   })
// });

module.exports = router;
