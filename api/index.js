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
router.get('/admin/users', function(req, res, next) {
  admin.auth().listUsers().then(listUsersResult=>{
    res.json(listUsersResult.users);
  })
  // res.json([{
  //   id: 1,
  //   name: "Jonathan Taylor",
  //   email:'whatever@wherever.com'
  // }, {
  //   id: 2,
  //   name: "Some Other User",
  //   email:'whatever@wherever.com'
  // }]);
});

module.exports = router;
