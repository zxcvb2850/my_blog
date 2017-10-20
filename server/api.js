/**
 * Created by wang on 2017/10/17.
 * 接口相关的
 */
const express = require('express');
const models = require('./db');

const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/
//创建账号接口
router.post('/api/banner/post', (req, res) => {
  console.log(req.body)
  let newBanner = new models.Banner({
    src: req.body.src
  })
  //保存数据newAccount数据进mongoDB
  newBanner.save((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send('createAccount successes');
    }
  });
})
//banner
router.get('/api/banner/get', (req, res) => {
  //保存数据newAccount数据进mongoDB
  models.Banner.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})
//文章
router.get('/api/articles/get', (req, res) => {
  //保存数据newAccount数据进mongoDB
  models.Article.find((err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

module.exports = router;
