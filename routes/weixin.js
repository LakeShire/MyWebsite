/**
 * Created by nali on 2016/5/19.
 */

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
    
    console.log('weixin verify');
    console.log('signature: ' + signature);
    console.log('timestamp: ' + timestamp);
    console.log('nonce: ' + nonce);
    console.log('echostr: ' + echostr);
    if (isLegel(signature, timestamp, nonce, token)) {
        res.send(echostr);
    }
});

module.exports = router;
