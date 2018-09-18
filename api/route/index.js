var express = require('express');
var router = express.Router();

const firebaseMiddleware = require('express-firebase-middleware');

var acl = require('../services/firebase/firebase-acl');

const root_controller = require('../controllers/rootController');
const adminRoutes = require('./adminRoutes');
const fleetRoutes = require('./fleetRoutes');
const sagePayRoutes = require('./sagePayRoutes');
const attendRoutes = require('./attendRoutes');

/*
implement firebase auth middleware,
 -uses token attached to every request
 -auth /api/*
 */
router.use('/', firebaseMiddleware.auth);
const userId = function(req, res) {
  console.debug(`asked for ${res.locals.user.uid}`);
  return res.locals.user.uid;
};
/*
implement acl middleware
 -go down 4 levels
   eg. http://api-host:port/api(1)/fleet(2)/transactions(3)/operator(4)
 */
router.use('/*', acl.middleware(3, userId));

/* GET api root page. */
router.get('/', root_controller.root);

router.use('/admin', adminRoutes);
router.use('/fleet', fleetRoutes);
router.use('/sage-pay', sagePayRoutes);
router.use('/attend', attendRoutes);

module.exports = router;
