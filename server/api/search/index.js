'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

router.get('/', controller.search);
router.get('/video', controller.videoSearch);
router.get('/playlist', controller.playlistSearch);

module.exports = router;