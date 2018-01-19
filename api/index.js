var express = require('express');
var router = express.Router();

const admin = require('./services/firebase/firebase-admin');

const firebaseMiddleware = require('express-firebase-middleware');

const root_controller = require('./controllers/rootController');
const admin_user_controller = require('./controllers/adminUserController');
const admin_rights_controller = require('./controllers/adminRightsController');

router.use('/', firebaseMiddleware.auth);

router.use('/*', (req, res, next) => {
  console.log(
    `** REQ FROM ${res.locals.user.name} - ${res.locals.user.email} ***`
  );
  next();
});

/* GET api root page. */
router.get('/', root_controller.root);

/* ACL routing allow & deny*/
router.post('/admin/acl/acl-allow', admin_rights_controller.acl_allow);
router.delete('/admin/acl/acl-deny', admin_rights_controller.acl_deny);


/* admin_user_controller routing */
router.get('/admin/users', admin_user_controller.admin_user_list);
router.delete('/admin/users/:uid', admin_user_controller.admin_user_delete);
router.put('/admin/users/:uid', admin_user_controller.admin_user_update);

router.get(
  '/admin/users/:uid/user-roles',
  admin_rights_controller.user_roles
);
router.get(
  '/admin/users/:uid/role-users',
  admin_rights_controller.role_users
);

router.post(
  '/admin/users/:uid/add-user-roles',
  admin_rights_controller.add_user_roles
);
router.delete(
  '/admin/users/:uid/remove-user-roles',
  admin_rights_controller.remove_user_roles
);

module.exports = router;
