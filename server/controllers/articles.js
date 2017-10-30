/**
 * Created by wang on 2017/10/25.
 */
const models = require('../models/index');
const Promise = require('promise');

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
  let response = {};
  let id = req.query.id || '';
  let detail = {};
  if (id) {
    detail = {
      _id: Object(id)
    };
  } else {
    response.status = ERROR;
    response.msg = "暂无此文章的详情";
    res.json(response);
    console.log("没有传入文章ID");
  }

  //更新语法
  //db.getCollection('index_articles').update({_id:ObjectId("59efeba77cf624053f3c5eab")}, {$inc:{read: 1}})
  models.Articles.update(detail, {$inc: {read: 1}}, function (err, docs) {
    if (err) {
      console.error("更新失败" + err);
    } else {
      console.error("更新成功" + docs);
      models.Articles.find(detail, (err, data) => {
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
    }
  });
};

exports.read = function (req, res, next) {
  let response = {};
  let id = req.query.id || '';
  let detail = {};
  if (id) {
    detail = {
      _id: Object(id)
    };
  } else {
    response.status = ERROR;
    response.msg = "暂无此文章的详情";
    res.json(response);
    console.log("没有传入文章ID");
  }

  models.Articles.find(detail, (err, data) => {
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
}

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
