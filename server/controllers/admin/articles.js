/**
 * Created by wang on 2017/11/25.
 */

const models = require('../../models/index');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');
const logger = require('../../logs/log').logger;

const db = require('../../config/connect');

const ERR_OK = 200;
const ERROR = -1;

db.on('close', function (err, db) {
  if (err) {
    logger.error(err + '关闭数据库失败');
    throw err;
  } else {
    logger.info("成功关闭数据库");
  }
});

/*
 * 发表文章
 * */
exports.add = (req, res, next) => {
  let title = req.body.title,
    type = parseInt(req.body.type, 10),
    parent = parseInt(req.body.parent, 10),
    desc = req.body.desc,
    from = req.body.from ? req.body.from : '自创',
    img = req.body.img,
    content = req.body.content,
    label = req.body.label.length !== 0 ? req.body.label : ['未分类'];

  let response = {status: ERROR, msg: '参数错误'};
  if (!title || !type || !parrent || !desc || !img || !content) {
    return res.json(response);
  }
  let time = new Date().getTime(),
    read = 0,
    leavs = [];

  let dbCollect = {title, type, time, parent, desc, from, img, content, label, read, leavs};
  logger.info("发表的文章", dbCollect);

  db.open(function (err, db) {
    if (err) {
      logger.error("打开数据库失败");
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
}

/*
 *   修改文章
 * */
exports.update = (req, res, next) => {
  let id = req.body._id;
  let title = req.body.title,
    type = parseInt(req.body.type, 10),
    parent = parseInt(req.body.parent, 10),
    desc = req.body.desc,
    from = req.body.from ? req.body.from : '自创',
    img = req.body.img,
    content = req.body.content,
    label = req.body.label;
  let oldimage = req.body.oldimage;
  let response = {status: ERROR, msg: '参数错误'};
  if (!id || !title || !type || !parent || !desc || !img || !content) {
    logger.info(id, title, type, parent, desc, img, content);
    logger.error(response);
    return res.json(response);
  }
  let time = new Date().getTime();

  let dbCollect = {title, type, time, parent, desc, from, img, content, label};
  logger.info("发表的文章", dbCollect);

  db.open(function (err, db) {
    if (err) {
      logger.error("打开数据库失败");
      throw err;
    } else {
      db.collection('index_articles', function (err, collection) {
        collection.update({_id: id}, {$set: dbCollect}, function (err, docs) {
            if (err) {
              logger.error(err);
              return res.json({
                status: ERROR,
                msg: '修改失败'
              })
            }
            logger.info(docs);     //   输出我们插入的内容
            db.close();
            res.json({
              status: ERR_OK,
              msg: '修改成功'
            })
          }
        )
        ;
      });
    }
  });
}
