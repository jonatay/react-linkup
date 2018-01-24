var express = require('express');
var router = express.Router();

var acl = require('../services/firebase/firebase-acl');

const admin_user_controller = require('../controllers/adminUserController');
const admin_rights_controller = require('../controllers/adminRightsController');

/* ACL routing allow & deny*/
router.post('/acl-allow', admin_rights_controller.acl_allow);
router.delete('/acl-deny', admin_rights_controller.acl_deny);

router.post('/add-role-parents', admin_rights_controller.acl_addRoleParents);
router.delete(
  '/remove-role-parents',
  admin_rights_controller.acl_removeRoleParents
);

router.post('/add-user-roles', admin_rights_controller.add_user_roles);
router.delete('/remove-user-roles', admin_rights_controller.remove_user_roles);
router.delete('/remove-role', admin_rights_controller.remove_role);
router.delete('/remove-resource', admin_rights_controller.remove_resource);

/* admin_user_controller routing */
router.get('/users', admin_user_controller.admin_user_list);
router.delete('/users/:uid', admin_user_controller.admin_user_delete);
router.put('/users/:uid', admin_user_controller.admin_user_update);

router.get('/users/:uid/user-roles', admin_rights_controller.user_roles);
router.get('/users/:uid/role-users', admin_rights_controller.role_users);

module.exports = router;
