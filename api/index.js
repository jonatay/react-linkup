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
    message: `You're logged in as ${res.locals.user.email} with Firebase UID: ${
      res.locals.user.uid
    }`
  });
});

/* GET users listing. */
router.get('/admin/users', function(req, res, next) {
  admin
    .auth()
    .listUsers()
    .then(listUsersResult => {
      res.json(listUsersResult.users);
    });
});

/* Delete actually disables, and returns updated user */
/* DELETE a user listing. */
router.delete('/admin/users/:uid', function(req, res, next) {
  const uid = req.params.uid;
  admin
    .auth()
    .deleteUser(uid)
    .then(() => {
      res.json({ status: 'success', action: 'delete', uid: uid });
    })
    .catch(err => {
      res.json({ status: 'error', action: 'delete', uid: uid, error: err });
    });
});

module.exports = router;
