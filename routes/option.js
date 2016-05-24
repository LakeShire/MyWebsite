var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/action.html', function(req, res, next) {
  res.render('option/action', { title: 'Express' });
});

router.get('/prepare.html', function(req, res, next) {
  res.render('option/prepare', { title: 'Express' });
});

router.get('/after.html', function(req, res, next) {
  res.render('option/after', { title: 'Express' });
});

module.exports = router;
