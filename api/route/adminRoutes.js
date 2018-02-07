var express = require('express');
var router = express.Router();

var acl = require('../services/firebase/firebase-acl');

const user_controller = require('../controllers/admin/userController');
const rights_controller = require('../controllers/admin/rightsController');

/* ACL routing allow & deny*/
router.post('/acl-allow', rights_controller.acl_allow);
router.delete('/acl-deny', rights_controller.acl_deny);

router.post('/add-role-parents', rights_controller.acl_addRoleParents);
router.delete(
  '/remove-role-parents',
  rights_controller.acl_removeRoleParents
);

router.post('/add-user-roles', rights_controller.add_user_roles);
router.delete('/remove-user-roles', rights_controller.remove_user_roles);
router.delete('/remove-role', rights_controller.remove_role);
router.delete('/remove-resource', rights_controller.remove_resource);

/* user_controller routing */
router.get('/users', user_controller.user_list);
router.delete('/users/:uid', user_controller.user_delete);
router.put('/users/:uid', user_controller.user_update);

router.get('/users/:uid/user-roles', rights_controller.user_roles);
router.get('/users/:uid/role-users', rights_controller.role_users);

module.exports = router;
