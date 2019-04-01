var express = require('express');
var router = express.Router();
var User = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUser/', (req, res, next) => {
  console.log('resdaffsdafsd ------------', req.body);
  var newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  })

  newUser.save(function (err, user) {
    if (err) {
      next(err)
      res.statusMessage(500)
      res.render('error', { error: err })
    } else {
      res.send(user)
    }
  })
  // res.json({a: 'user added!'})
})


router.post('/login', (req, res, next) => {
  User.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
    if (err) throw err;
    var token = jwt.sign({ userId: user._id }, 'mytokenkey');
    // res.send(user)
    user.token = token;
    res.status(200).json(user)
  }).lean();
})

module.exports = router;
