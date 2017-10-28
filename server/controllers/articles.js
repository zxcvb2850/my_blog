/**
 * Created by wang on 2017/10/25.
 */

const models = require('../models/index');

const ERR_OK = 200;
const ERROR = 100;

/*
 * 获取文章列表
 * */
exports.get = function (req, res, next) {
  let type = req.query.type || '';
  let select = {};
  if (type) {
    select = {
      label: {
        $all: [type]
      }
    };
  }
  console.error(select)

  models.Articles.find(select, (err, data) => {
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
  }).sort({time: -1});
};

/*
 * 添加文章
 * */
exports.add = function (req, res, next) {
  res.send("修改中");
};

/*
 * 获取文章详情
 * */
exports.detail = function (req, res, next) {
  let id = req.query.id || '';
  let detail = {};
  if (id) {
    detail = {
      _id: Object(id)
    };
  }

  models.Articles.find(detail, (err, data) => {
    let response = {};
    if (err) {
      response.status = ERROR;
      response.msg = "服务器错误";
      res.json(response);
      console.error(err);
    } else {
      response.status = ERR_OK;
      response.data = data;
      res.json(response);
      console.log("成功");
    }
  });
};

/*
 * 获取所有的标签
 * */
exports.label = function (req, res, next) {
  models.Articles.find({}, {label: 1}, (err, data) => {
    let response = {};
    if (err) {
      response.status = ERROR;
      response.msg = "服务器错误";
      res.json(response);
      console.error(err);
    } else {
      console.log(data)
      response.status = ERR_OK;
      response.data = data;
      response.count = data.length;
      res.json(response);
      console.log("成功");
    }
  });
};
