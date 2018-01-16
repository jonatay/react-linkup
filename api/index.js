var express = require('express');
var router = express.Router();

const admin = require('./services/firebase/firebase-admin');

const firebaseMiddleware = require('express-firebase-middleware');

const acl = require('./services/firebase/firebase-acl');

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

/* PUT a user listing.
*   
*   data contains user and changes
*   
*   if changes has admin type boolean
*     setCustomClaims with new admin and old roles
*   ELSE 
*   if changes has roles type array
*     setCustomClaims with new roles, old admin
*   ELSE
*     updateUser with changes
*
* */
router.put('/admin/users/:uid', function(req, res) {
  const uid = req.params.uid;
  const data = req.body;
  const user = data.user;
  const changes = data.changes;
  if (typeof changes.admin === 'boolean') {
    console.log(
      `setting custom claim admin = ${changes.admin} for user ${
        user.displayName
      }`
    );
    if (changes.admin) {
      acl.addUserRoles(uid, 'admin');
    } else {
      acl.removeUserRoles(uid, 'admin');
    }
    admin
      .auth()
      .setCustomUserClaims(uid, {
        roles: user.customClaims.roles,
        admin: changes.admin
      })
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
  } else if (Array.isArray(changes.roles)) {
    console.log(
      `setting custom claim roles = ${changes.roles} for user ${
        user.displayName
      }`
    );
    admin
      .auth()
      .setCustomUserClaims(uid, {
        roles: changes.roles,
        admin: user.customClaims.admin
      })
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
    console.log(`updating uid:${uid} with:`, changes);
    admin
      .auth()
      .updateUser(uid, changes)
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
