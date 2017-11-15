const express = require('express');
const router = express.Router();
const users = require('../../controllers/admin/users');

/* GET home page. */
/*router.get('/', function(req, res, next) {
 res.redirect('/admin');
 });*/
const ERR_OK = 200;
const ERROR = -1;

router.get('/admin/cookie', function (req, res, next) {
  let session = req.cookies;
  let response = {};
  console.log(session);
  if (!session.user) {
    response = {
      status: ERROR,
      msg: '无记录'
    }
    return res.json(response)
  } else {
    response = {
      status: ERR_OK,
      msg: '已登录',
      data: session
    }
    res.json(response);
    next();
  }
});

/* 验证用户名密码*/
router.post('/admin/login', users.login);

module.exports = router;
