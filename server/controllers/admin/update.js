/**
 * Created by wang on 2017/11/25.
 */
const models = require('../../models/admin');
const logger = require('../../logs/log').logger;

const fs = require('fs');
const formidable = require('formidable');

const ERR_OK = 200;
const ERROR = -1;

let TITLE = 'formidable上传示例',
  AVATAR_UPLOAD_PATH = 'server/public',
  AVATAR_UPLOAD_FOLDER = '/images/icon/';

exports.icon = (req, res, next) => {
  logger.info("上传头像");

  let form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = AVATAR_UPLOAD_PATH + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function (err, fields, files) {

    if (err) {
      res.locals.error = err;
      res.render('index', {title: TITLE});
      return;
    }

    let extName = '';  //后缀名
    switch (files.file.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

    if (extName.length === 0) {
      logger.error('上传图片格式不正确');

      return res.json({
        status: ERROR,
        msg: '暂只支持png和jpg格式的图片'
      })
    }

    let reg = eval("/\\\w*." + extName + "/")               //拼接正则
    let avatarName = files.file.path.match(reg)[0];    //获取上传的图片名字
    let newPath = AVATAR_UPLOAD_FOLDER + avatarName;              //图片写入地址

    logger.info(avatarName);                    //上传的文件名
    console.log("newPath", newPath);            //次参数需要写到数据库中
    return res.json({
      status: ERR_OK,
      msg: '上传成功',
      url: newPath
    });
  });
}

exports.deleteIcon = (uName) => {
  let path = AVATAR_UPLOAD_PATH + uName
  if (fs.existsSync(path)) {
    fs.unlinkSync(path, function (err) {
      if (err) throw err;
      logger.info('删除更新之前的图片成功');
    });
  }
}
