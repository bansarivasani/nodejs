var express = require('express');
var router = express.Router();
var user = require('../controller/usercontroller');


router.post('/register',user.register);
router.post('/login',user.login);


module.exports = router;
