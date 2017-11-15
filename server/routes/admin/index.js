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
  console.log("--------");
  console.log(session);
  console.log("--------");
  if (!session) {
    return res.json({
      status: ERROR,
      msg: '无记录'
    })
  }
  return res.json({
    status: ERR_OK,
    msg: '已登录',
    data: session
  });
});

/* 验证用户名密码*/
router.post('/admin/login', users.login);

module.exports = router;
