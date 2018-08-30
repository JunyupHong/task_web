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
  try {
    await db.createUser(key, value);
    res.json({
      success: true,
      body: {
        'name': req.body.name,
        'age': req.body.age,
        'food': req.body.food,
        'hobby': req.body.hobby,
      },
    });
  }
  catch (e) {
    res.json({
      success: false,
      body: {},
    });
  }
});


router.get('/user/:name', async (req, res, next) => {
  const key = req.params.name;
  const user = await db.getUser(key);
  res.send(user);
});

router.get('/users', async (req, res, next) => {
  const users = await db.getUsers();
  res.send(users);
});

router.put('/user', async (req, res, next) => {
  try {
    await db.updateUser(req.body.name, req.body);
    res.json({
      success: true,
      body: {
        'name': req.body.name,
        'age': req.body.age,
        'food': req.body.food,
        'hobby': req.body.hobby,
      },
    });
  } catch (e) {
    res.json({
      success: false,
      body: {}
    });
  }
});

router.delete('/user/:name', async (req, res, next) => {
  try {
    await db.deleteUser(req.params.name);
    res.json({
      success: true,
    })
  }
  catch (e) {
    console.log(e);
    res.json({
      success: false,
    })
  }
});


module.exports = router;