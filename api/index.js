var express = require('express');
var router = express.Router();

const admin = require('./services/firebase/firebase-admin');

const firebaseMiddleware = require('express-firebase-middleware');

// router.use((req, res, next) => {
//   next();
// });

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

/* DELETE a user listing. */
router.delete('/admin/users/:uid', function(req, res) {
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

/* PUT a user listing. */
router.put('/admin/users/:uid', function(req, res) {
  const uid = req.params.uid;
  const data = req.body;
  if (typeof data.isAdmin == 'boolean') {
    admin
      .auth()
      .setCustomUserClaims(uid, { admin: data.isAdmin })
      .then(() => {
        admin
          .auth()
          .getUser(uid)
          .then(userRecord => {
            res.json({
              status: 'success',
              action: 'update',
              uid: uid,
              user: userRecord
            });
          })
          .catch(err => {
            res.json({
              status: 'error',
              action: 'update',
              uid: uid,
              error: err
            });
          });
      });
  } else {
    console.log(`updating uid:${uid} with:`, req.body);
    admin
      .auth()
      .updateUser(uid, req.body)
      .then(userRecord => {
        res.json({
          status: 'success',
          action: 'update',
          uid: uid,
          user: userRecord
        });
      })
      .catch(err => {
        res.json({ status: 'error', action: 'update', uid: uid, error: err });
      });
  }
});

module.exports = router;
