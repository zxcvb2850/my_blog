const models = require('../../models/index');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');
const update = require('./update');
const logger = require('../../logs/log').logger;

const db = require('../../config/connect');

const ERR_OK = 200;
const ERROR = -1;

/*添加banner*/
exports.addBanner = (req, res, next) => {
  let title = req.body.title,
    desc = req.body.desc,
    src = req.body.src;

  let time = new Date();

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
  let page = parseInt(req.query.page, 10) || '',
    rows = parseInt(req.query.rows, 10) || 10;
  let start = 0;
  if (page) {
    start = (page - 1) * rows;
  }

  let response = {
    status: ERROR,
    msg: '参数错误'
  };

  let query = models.Banner.find().skip(start).limit(rows).sort({time: -1});

  query.exec((err, data)=>{
    if(err){
      response.msg = '查询失败';
      logger.error(response);
      return res.json(response);
    }

    models.Banner.find((err, docs) => {
      if (err) {
        looger.error('err');
        response.msg = '服务器错误';
        return res.json(response);
      }
      response.data = data;
      response.status = ERR_OK;
      response.msg = '查询成功';
      response.rows = data.length;
      response.count = docs.length;
      logger.info(response);
      res.json(response);
    });
  })
}

/*删除banner*/
exports.deleteBanner = (req, res, next) => {
  let id = req.body.id,
    src = req.body.src;

  let response = {status: ERROR, msg: '参数错误'};

  if (!id || !src) {
    logger.error(response);
    return res.json(response);
  }

  models.Banner.remove({"_id": id}, function (err, docs) {
    if (err) {
      logger.error(err);
      logger.error(err, "----删除失败");
      return res.json({
        status: ERROR,
        msg: '删除失败'
      })
    }
    logger.info(id, "------删除成功");
    update.deleteIcon(src);
    logger.info("图片删除成功");
    res.json({
      status: ERR_OK,
      msg: '删除成功'
    });
  });
}
