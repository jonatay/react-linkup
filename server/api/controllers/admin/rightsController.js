const admin = require('../../services/firebase/firebase-admin');
const acl = require('../../services/firebase/firebase-acl');

exports.allowedPermissions = function(req, res) {
  const uid = req.params.uid;
  const resources = req.parema.resources;
  acl.allowedPermissions(uid, resources, function(err, obj) {
    if (err) {
      res.json(err);
    } else {
      res.json(obj);
    }
  });
};

exports.user_roles = function(req, res) {
  const uid = req.params.uid;
  acl.userRoles(uid, function(err, userRoles) {
    if (err) {
      res.json(err);
    } else {
      res.json(userRoles);
    }
  });
};

exports.role_users = function(req, res) {
  const role = req.params.role;
  acl.roleUsers(role, function(err, users) {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
};

exports.acl_allow = function(req, res) {
  const payload = req.body;
  acl.allow(payload.roles, payload.resources, payload.permissions, err => {
    if (err) {
      res.json(err);
    } else {
      res.json('done allow');
    }
  });
};

exports.acl_deny = function(req, res) {
  const payload = req.body;
  acl.removeAllow(
    payload.roles[0],
    payload.resources,
    payload.permissions,
    err => {
      if (err) {
        res.json(err);
      } else {
        res.json('done deny');
      }
    }
  );
};

exports.acl_addRoleParents = function(req, res) {
  const payload = req.body;
  acl.addRoleParents(payload.role, payload.parents, function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json('done add role parents');
    }
  });
};

exports.acl_removeRoleParents = function(req, res) {
  const payload = req.body;
  acl.removeRoleParents(payload.role, payload.parents, function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json('done remove role parents');
    }
  });
};

/*
  acl.addUserRoles,
  then acl.userRoles to get all roles
  then admin.setCustomClaims with all users roles
  return roles
 */
exports.add_user_roles = function(req, res) {
  const payload = req.body;
  const uid = payload.uid;
  const roles = payload.roles;
  acl.addUserRoles(uid, roles, function(err) {
    if (err) {
      res.json(err);
    } else {
      acl.userRoles(uid, function(err, userRoles) {
        if (err) {
          res.json(err);
        } else {
          admin
            .auth()
            .setCustomUserClaims(uid, {
              roles: userRoles
            })
            .then(() => {
              res.json(userRoles);
            });
        }
      });
    }
  });
};

exports.remove_user_roles = function(req, res) {
  const payload = req.body;
  const uid = payload.uid;
  const roles = payload.roles;
  acl.removeUserRoles(uid, roles, function(err) {
    if (err) {
      res.json(err);
    } else {
      acl.userRoles(uid, function(err, userRoles) {
        if (err) {
          res.json(err);
        } else {
          admin
            .auth()
            .setCustomUserClaims(uid, {
              roles: userRoles
            })
            .then(() => {
              res.json(userRoles);
            });
        }
      });
    }
  });
};

exports.remove_role = function(req, res) {
  const payload = req.body;
  const role = payload.role;
  console.log(`removing role ${role}`);
  acl.removeRole(role, function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json({ removed: role });
    }
  });
};

exports.remove_resource = function(req, res) {
  const payload = req.body;
  const resource = payload.resource;
  console.log(`removing resource ${resource}`);
  acl.removeResource(resource, function(err) {
    if (err) {
      res.json(err);
    } else {
      res.json({ removed: resource });
    }
  });
};