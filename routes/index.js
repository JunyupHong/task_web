var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/ajou_univ', function(req, res, next) {
    res.render('ajou_univ');
});

router.get('/modal', function(req, res, next) {
    res.render('modal');
});

router.get('/instagram', function(req, res, next) {
    res.render('instagram');
});

router.get('/firebase', function(req, res, next) {
    res.render('firebase');
});

router.get('/kakaotalk', function(req, res, next) {
    res.render('kakaotalk_login');
});

router.get('/kakaotalk/chatting_rooms', function(req, res, next) {
    res.render('kakaotalk_chatting_rooms');
});

router.get('/kakaotalk/friends', function(req, res, next) {
    res.render('kakaotalk_friends');
});

router.get('/kakaotalk/profile', function(req, res, next) {
    res.render('kakaotalk_profile');
});

router.get('/kakaotalk/chatting', function(req, res, next) {
    res.render('kakaotalk_chatting');
});

router.get('/kakaotalk/setting', function(req, res, next) {
    res.render('kakaotalk_setting');
});

module.exports = router;
