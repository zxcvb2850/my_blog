/**
 * Created by wang on 2017/10/25.
 */

const models = require('../../models/index');
const logger = require('../../logs/log').logger;

const ERR_OK = 200;
const ERROR = 100;

exports.get = function (req, res, next) {
  models.Banner.find((err, data) => {
    let response = {};
    if (err) {
      response.status = ERROR;
      response.msg = "服务器错误";
      logger.error(err);
      res.json(response);
    } else {
      response.status = ERR_OK;
      response.count = data.length;
      response.data = data;
      logger.error(response);
      res.json(response);
    }
  }).sort({time: -1}).limit(3);
};
