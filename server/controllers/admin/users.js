/**
 * Created by wang on 2017/11/8.
 */
const models = require('../../models/admin');
const logger = require('../../logs/log').logger;

const ERR_OK = 200;
const ERROR = -1;

exports.login = (req, res, next) => {
  logger.error(req.body);
  let username = req.body.username,
    password = req.body.password;
  logger.error(username, password);
  let response = {};
  if (!username && !password) {
    response.status = ERROR;
    response.msg = "参数错误";
    logger.error("参数错误");
    return res.json(response);
  }
  models.User.find({username}, {"password": 1}, (err, data) => {
    if (err) {
      response.status = ERROR;
      response.msg = "用户不存在";
      logger.error(response);
      return res.json(response);
    } else {
      if (data.length) {
        let pwd = data[0].password;
        if (password === pwd) {
          response.status = ERR_OK;
          response.msg = "登陆成功,2s自动跳转";
          logger.error(response);
          res.json(response);
        }
      } else {
        response.status = ERROR;
        response.msg = "账号或密码错误";
        logger.error(response);
        return res.json(response);
      }
    }
  })
}

