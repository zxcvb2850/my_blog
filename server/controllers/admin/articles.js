/**
 * Created by wang on 2017/11/25.
 */

const models = require('../../models/index');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');
const logger = require('../../logs/log').logger;

const ERR_OK = 200;
const ERROR = -1;

exports.add = (req, res, next) => {
  let title = req.body.title,
    type = req.body.type,
    parent = req.body.parent,
    desc = req.body.desc,
    from = req.body.from,
    img = req.body.img,
    content = req.body.content,
    label = req.body.label;

  let time = new Date().getTime(),
    read = 0,
    leavs = [];
  logger.info(title, type, parent, desc, from, img, content, label);

  // models.Articles.

  res.send("添加文章")
}
