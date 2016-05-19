/**
 * Created by nali on 2016/5/19.
 */

var express = require('express');
var router = express.Router();
var crypto = require("crypto");

function isLegel(signature, timestamp, nonce, token){
    var array = new Array();
    array[0] = timestamp;
    array[1] = nonce;
    array[2] = token;
    array.sort();
    var hasher = crypto.createHash("sha1");
    var msg = array[0] + array[1] + array[2];
    hasher.update(msg);
    var msg = hasher.digest('hex');
    if(msg == signature){
        return true;
    } else {
        return false;
    }
}

/* GET users listing. */
router.get('/', function(req, res, next) {
    var signature = req.param('signature');
    var timestamp = req.param('timestamp');
    var nonce = req.param('nonce');
    var echostr = req.param('echostr');
    var token = 'lakeshire';
    if (isLegel(signature, timestamp, nonce, token)) {
        res.send(echostr);
    }
});

module.exports = router;
