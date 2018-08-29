var express = require('express');
var router = express.Router();
const db = require('./db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('redisAPI', {title: 'API SERVER'});
});


router.post('/user', async (req, res, next) => {
  const key = req.body.name;
  const value = req.body;
  console.log(key, value, 'adsfasdfasdfadsf');
  try {
    await db.createUser(key, value);
    res.json({
      success: true,
      body: {
        'name' : req.body.name,
        'age' : req.body.age,
        'food' : req.body.food,
        'hobby' : req.body.hobby,
      },
    });
  }
  catch(e) {
    res.json({
      success: false,
      body: {},
    });
  }
});



router.get('/user/:name', async (req, res, next) => {
  const key = req.params.name;
  console.log(key);
  const user = await db.getUser(key);
  res.send(user);
});

router.get('/users', async (req, res, next) => {
  const users = await db.getUsers(db.getUser);
  res.send(users);
});


module.exports = router;