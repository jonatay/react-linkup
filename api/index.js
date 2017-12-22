var express = require('express');
var router = express.Router();

const admin = require('./services/firebase/firebase-admin');


const firebaseMiddleware = require('express-firebase-middleware');


router.use((req, res, next) => {
  next();
});

router.use('/', firebaseMiddleware.auth);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${res.locals.user.uid}`
  });
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  // res.send('respond with a resource');
  res.json([{
    id: 1,
    username: "jono"
  }, {
    id: 2,
    username: "user"
  }]);
});

module.exports = router;
