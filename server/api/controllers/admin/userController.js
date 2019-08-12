const admin = require('../../services/firebase/firebase-admin');
const acl = require('../../services/firebase/firebase-acl');

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}

exports.user_list = function(req, res) {
  admin
    .auth()
    .listUsers()
    .then(listUsersResult => {
      res.json(listUsersResult.users);
    });
};

exports.user_detail = function(req, res) {
  console.log(req.params.id);
};

exports.user_delete = function(req, res) {
  console.log(req.params.id);
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
};

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
exports.user_update = function(req, res) {
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
};
