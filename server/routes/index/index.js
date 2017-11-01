/**
 * Created by wang on 2017/10/25.
 */

const express = require('express');
const router = express.Router();
const banners = require('../../controllers/banner');
const articles = require('../../controllers/articles');

/* 获取banner数据 */
router.get('/banner/get', banners.get);


/* 获取文章列表 */
router.post('/articles/post', articles.add);
router.get('/articles/get', articles.get);
/*获取文章详细*/
router.get('/article/detail', articles.detail);
router.get('/article/detail/read', articles.read);
/*获取所有的标签*/
router.get('/label', articles.label);
/*留言*/
router.get('/article/leavs/get', articles.getLeavs);
router.post('/article/leavs', articles.leavs);

module.exports = router;
