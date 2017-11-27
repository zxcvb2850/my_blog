/**
 * Created by wang on 2017/11/25.
 */

const models = require('../../models/index');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');
const logger = require('../../logs/log').logger;

const db = require('../config/connect');

const ERR_OK = 200;
const ERROR = -1;

/*
* 发表文章
* */
exports.add = (req, res, next) => {
  let title = req.body.title,
    type = parseInt(req.body.type, 10),
    parent = parseInt(req.body.parent, 10),
    desc = req.body.desc,
    from = req.body.from,
    img = req.body.img,
    content = req.body.content,
    label = req.body.label;

  let time = new Date().getTime(),
    read = 0,
    leavs = [];

  let dbCollect = {title, type, time, parent, desc, from, img, content, label, read, leavs};
  logger.info("发表的文章", dbCollect);

  db.open(function (err, db) {
    if (err) {
      throw err;
    } else {
      db.collection('index_articles', function (err, collection) {
        collection.insert(dbCollect, function (err, docs) {
          if (err) {
            logger.error(err);
            return res.json({
              status: ERROR,
              msg: '发表失败'
            })
          }
          logger.info(docs);     //   输出我们插入的内容
          db.close();
          res.json({
            status: ERR_OK,
            msg: '发表成功'
          })
        });
      });
    }
  });
  db.on('close', function (err, db) {
    if (err) {
      throw err;
      logger.error(err + '关闭数据库失败');
    } else {
      logger.info("成功关闭数据库");
    }
  });
}
