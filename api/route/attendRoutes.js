var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/access/userController');

router.get('/attend-users', user_controller.list);

module.exports = router;
