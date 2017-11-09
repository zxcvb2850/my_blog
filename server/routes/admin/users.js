const express = require('express');
const router = express.Router();
const users = require('../../controllers/admin/users');

/* 验证用户名密码*/
router.post('/login', users.login);

module.exports = router;
