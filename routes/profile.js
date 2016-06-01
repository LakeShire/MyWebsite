var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});

router.get('/info.html', function(req, res, next) {
  res.render('profile/info', { title: 'Express' });
});

router.get('/settings.html', function(req, res, next) {
  res.render('profile/settings', { title: 'Express' });
});

module.exports = router;
