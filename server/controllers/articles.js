/**
 * Created by wang on 2017/10/25.
 */
const models = require('../models/index');
const Promise = require('promise');
const log4js = require('log4js');
const util = require('../public/javascripts/util');

const logger = log4js.getLogger();
const ERR_OK = 200;
const ERROR = -1;

/*
 * 获取文章列表
 * */
exports.get = function (req, res, next) {
  let type = req.query.type || '';
  let select = {};
  if (type) {
    select = {
      type
    }
  } else {
    select = {}
  }

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
 * 获取热门文章
 * */
exports.getHot = (req, res, next) => {
  let response = {}
  models.Articles.find({}, {title: 1, parent: 1, time: 1}, function (err, data) {
    if (err) {
      response.msg = "获取文章失败";
      response.status = ERROR;
      logger.error("文章获取失败" + err);
      return res.json(response);
    } else {
      response.count = data.length;
      response.data = data;
      response.status = ERR_OK;
      console.log(response);
      console.log(1234);
      res.json(response);
    }
  }).sort({read: -1});
}

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
    response.msg = "参数不正确";
    console.log("没有传入文章ID");
    return res.json(response);
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

/*
 * 用户留言
 * */
/*获取评论*/
exports.getLeavs = (req, res, next) => {
  let id = req.query.id;
  let page = parseInt(req.query.page)
  let rows = parseInt(req.query.rows)
  let response = {};    //返回数据
  let detail = {};      //获取ID
  let limit = '';       //获取分页
  if (id) {
    detail = {
      _id: Object(id)
    };
  } else {
    response.status = ERROR;
    response.msg = "参数不正确";
    console.log("没有传入文章ID");
    return res.json(response);
  }
  if (!rows || !page) {
    limit = 1;
  } else {
    limit = {
      $slice: [page - 1, rows]
    };
  }
//db.getCollection('index_articles').find({"_id" : ObjectId("59f95578200a35c473de6429")},{"leavs":{"$slice":[0,10]}})
  models.Articles.find(detail, {leavs: limit}, (err, data) => {
    if (err) {
      response.status = ERROR;
      response.msg = "服务器错误";
      res.json(response);
      console.error(err);
    } else {
      let getData = data[0].leavs;
      if (getData) {
        for (let i = 0; i < getData.length; i++) {
          getData[i].time = util.getNowDate(getData[i].time);
        }
        response.status = ERR_OK;
        response.data = getData;
        response.count = getData.length;
        return res.json(response);
      }
    }
  });
}
/*添加评论*/
exports.leavs = (req, res, next) => {
  let id = req.body.id,
    name = req.body.name,
    email = req.body.email,
    content = req.body.center;
  let time = (new Date()).getTime();
  let detail = {};
  let response = {
    msg: "参数不正确",
    status: -1
  };
  if (id) {
    detail = {
      _id: Object(id)
    };
  } else {
    response.status = ERROR;
    response.msg = "参数错误";
    console.log("没有传入文章ID");
    return res.json(response);
  }

  if (!id || !name || !email || !content) {
    return res.json(response)
  }
  let regEmail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
  if (!regEmail.test(email)) {
    response.msg = "邮箱格式不正确";
    return res.json(response);
  }

  models.Articles.find(detail, {leavs: 1}, (err, data) => {
    let response = {};
    if (err) {
      console.error("查询失败");
      console.error(err);
      return res.json({status: 500, msg: "服务器出错"});
    }
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        let leaving = data[i].leavs;
        for (let j = 0; j < leaving.length; j++) {
          if (name === leaving[j].name) {
            response.msg = "此用户名已使用，请跟换";
            response.status = -1;
            console.error(response.msg);
            return res.json(response);
          }
        }
      }
    }
    let dataInsert = {
      name,
      email,
      content,
      time,
      avatar: 'logo.png'
    };

    models.Articles.update(detail, {
      $push: {
        leavs: {
          $each: [dataInsert],
          $sort: {"time": -1},
          //$slice: 3,    //限制条数
          $position: 2
        }
      }
    }, (err, data) => {
      if (err) {
        response.status = ERROR;
        response.msg = "评论失败";
        console.error(err);
        res.json(response);
      } else {
        response.status = ERR_OK;
        response.msg = "评论成功";
        res.json(response);
      }
    })
  })
  //插入的逻辑
  /*db.getCollection('index_articles').update({"_id" : ObjectId("59f82662200a35c473de45f9")},
   {$push:{leavs:{name:"name",email:"164218@qq.com",content:"content",time:"2017-10-31 16:54",avatar:"logo.png"}}})*/

  /*db.getCollection('index_articles').update({_id: ObjectId("59f82d04200a35c473de4853")},
   {
   $push: {
   leavs: {
   $each: [{name: "6", email: "6", content: "6", time: "12345691", avatar: "logo.png"}],
   $sort: {time: -1},
   $slice: 3,
   $position: 2
   }
   }
   }
   );*/
}
