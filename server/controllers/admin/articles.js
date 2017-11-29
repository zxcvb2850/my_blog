/**
 * Created by wang on 2017/11/25.
 */

const models = require('../../models/index');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');
const logger = require('../../logs/log').logger;
const update = require('./update');

const db = require('../../config/connect');

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
    from = req.body.from ? req.body.from : '自创',
    img = req.body.img,
    content = req.body.content,
    label = req.body.label.length !== 0 ? req.body.label : ['未分类'];

  let response = {status: ERROR, msg: '参数错误'};
  if (!title || !type || !parent || !desc || !img || !content) {
    return res.json(response);
  }
  let time = new Date().getTime(),
    read = 0,
    status = 1,
    leavs = [];

  let dbCollect = {title, type, time, parent, status, desc, from, img, content, label, read, leavs};
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

  db.on('close', function (err, db) {
    if (err) {
      logger.error(err + '关闭数据库失败');
      throw err;
    } else {
      logger.info("成功关闭数据库");
    }
  });
}

/*
 * 修改文章
 * */
exports.update = (req, res, next) => {
  let id = req.body._id;
  let title = req.body.title,
    type = parseInt(req.body.type, 10),
    parent = parseInt(req.body.parent, 10),
    status = parseInt(req.body.status, 10),
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

  let upDate = {title, type, time, parent, status, desc, from, img, content, label};
  logger.info("更新的文章", upDate);

  models.Articles.update({"_id": id}, {$set: upDate}, (err, docs) => {
    if (err) {
      logger.error(err);
      response.status = ERROR;
      response.msg = '更新失败'
      logger.error(response);
      return res.json(response);
    } else {
      models.Articles.find({"_id": id}, {"img": 1}, (err, data) => {
        if (err) {
          logger.error(err);
          return res.json({
            status: ERROR,
            msg: '服务器错误'
          })
        }
        logger.info(data[0].img);
        let newimage = data[0].img;
        if (oldimage !== newimage) {
          logger.error('两次提交的照片不一致');
          update.deleteIcon(oldimage);
        } else {
          logger.error('没有更改照片')
        }
      })
      response.status = ERR_OK;
      response.msg = '更新成功';
      res.json(response);
    }
  })
}

/*
 * 删除文章
 * */
exports.delete = (req, res, next) => {
  let id = req.body.id;
  let img = req.body.img;

  models.Articles.remove({"_id": id}, function (err, docs) {
    if (err) {
      logger.error(err);
      logger.error(err, "----删除失败");
      return res.json({
        status: ERROR,
        msg: '删除失败'
      })
    }
    logger.info(id, "------删除成功");
    update.deleteIcon(img);
    logger.info("图片删除成功");
    res.json({
      status: ERR_OK,
      msg: '删除成功'
    });
  });
}
