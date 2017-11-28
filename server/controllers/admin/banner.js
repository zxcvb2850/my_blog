const models = require('../../models/index');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');
const logger = require('../../logs/log').logger;

const db = require('../../config/connect');

const ERR_OK = 200;
const ERROR = -1;

/*添加banner*/
exports.addBanner = (req, res, next) => {
  let title = req.body.title,
    desc = req.body.desc,
    src = req.body.src;

  let time = new Date().getTime();

  let dbCollect = {title, desc, src, time};
  logger.info("添加Banner", dbCollect);

  db.open(function (err, db) {
    if (err) {
      throw err;
    } else {
      db.collection('index_banners', function (err, collection) {
        collection.insert(dbCollect, function (err, docs) {
          if (err) {
            logger.error(err);
            return res.json({
              status: ERROR,
              msg: '添加失败'
            })
          }
          logger.info(docs);     //   输出我们插入的内容
          db.close();
          res.json({
            status: ERR_OK,
            msg: '添加成功'
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

/*获取banner*/
exports.get = (req, res, next) => {
  let response = {
    status: ERROR,
    msg: '参数错误'
  }
  models.Banner.find((err, docs) => {
    if (err) {
      looger.error('err');
      response.msg = '服务器错误';
      return res.json(response);
    }

    docs[0].time = util.getNowDate(docs[0].time);
    response.data = docs;
    response.status = ERR_OK;
    response.msg = '查询成功';
    response.count = docs.length;
    res.json(response);
  })
}
