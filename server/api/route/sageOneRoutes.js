const express = require('express');
const router = express.Router();

const sageOneController = require('../controllers/sageOne/sageOneController');

router.get('/sage-one', sageOneController.list);

module.exports = router;
