const express = require('express');
const router = express.Router();
const users = require('../../controllers/admin/users');

router.post('/login', users.login);

module.exports = router;
