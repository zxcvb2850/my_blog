/**
 * Created by wang on 2017/10/25.
 */

const models = require('../../models/index');

const ERR_OK = 200;
const ERROR = 100;

exports.get = function (req, res, next) {
  models.Banner.find((err, data) => {
    let response = {};
    if (err) {
      response.status = ERROR;
      response.msg = "服务器错误";
      res.json(response);
      console.error(err);
    } else {
      response.status = ERR_OK;
      response.count = data.length;
      response.data = data;
      res.json(response);
      console.log("成功");
    }
  });
};
