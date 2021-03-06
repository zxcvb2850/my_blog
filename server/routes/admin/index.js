const express = require('express');
const router = express.Router();
const users = require('../../controllers/admin/users');
const update = require('../../controllers/admin/update');
const articles = require('../../controllers/admin/articles');
const banner = require('../../controllers/admin/banner');

/* GET home page. */
/*router.get('/', function(req, res, next) {
 res.redirect('/admin');
 });*/
const ERR_OK = 200;
const ERROR = -1;

router.get('/admin/cookie', function (req, res, next) {
  let cookies = req.cookies;
  let response = {};
  console.log(cookies);
  if (!cookies.user) {
    response = {
      status: ERROR,
      msg: '无记录'
    }
    return res.json(response)
  } else {
    response = {
      status: ERR_OK,
      msg: '已登录',
      data: cookies
    }
    res.json(response);
    next();
  }
});

/* 验证用户名密码*/
router.post('/admin/login', users.login);

/*上传头像*/
router.post('/admin/image', update.icon);

/*文章管理*/
router.post('/articles/add/post', articles.add);
router.post('/articles/update/post', articles.update);
router.post('/articles/delete/post', articles.delete);

/*添加banner*/
router.get('/admin/banner/get', banner.get)
router.post('/banner/add/post', banner.addBanner);
router.post('/banner/delete/post', banner.deleteBanner);

module.exports = router;
