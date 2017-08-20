'use strict';

let express = require('express');
let api = require('../../src/api/api');
let user = require('../api/userApi');



let router = express.Router();
router.get('/', function (req, res) {
 	 res.send('Home page');
});

router.post(api.userLogin, user.login); // 登录



module.exports = router;
