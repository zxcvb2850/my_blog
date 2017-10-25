/**
 * Created by wang on 2017/10/25.
 */

const express = require('express');
const router = express.Router();
const articles = require('../../controllers/articles');
const banners = require('../../controllers/banner');

/* 获取banner数据 */
router.get('/banner/get', banners.get);


/* 获取文章列表 */
router.post('/articles/post', articles.add);
router.get('/articles/get', articles.get);

module.exports = router;
