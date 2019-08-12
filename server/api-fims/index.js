const express = require('express');
const router = express.Router();
const fimsApi = require('./fimsApi');

router.use('/fims', fimsApi);

module.exports = router;
