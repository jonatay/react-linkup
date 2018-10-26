var express = require('express');
var router = express.Router();

const attendUserController = require('../controllers/attend/attendUserController');
const attendDeptController = require('../controllers/attend/attendDeptController');
const attendLogController = require('../controllers/attend/attendLogController');

router.get('/attend-users', attendUserController.list);
router.get('/attend-depts', attendDeptController.list);
router.get('/attend-logs/:params', attendLogController.list);

router.get('/attend-logs/list-pdf/:params', attendLogController.pdf);

module.exports = router;
