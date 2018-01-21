var express = require('express');
var router = express.Router();

const firebaseMiddleware = require('express-firebase-middleware');

var acl = require('../services/firebase/firebase-acl');

const root_controller = require('../controllers/rootController');
const adminRoutes = require('./adminRoutes');

router.use('/', firebaseMiddleware.auth);
const userId = function(req, res) {
  console.debug(`asked for ${res.locals.user.uid}`)
  return res.locals.user.uid;
};

router.use('/*', acl.middleware(4, userId));

/* GET api root page. */
router.get('/', root_controller.root);
router.use('/admin', adminRoutes);

module.exports = router;
