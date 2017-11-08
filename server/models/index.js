/**
 * Created by wang on 2017/10/25.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/************** 定义模式bannerSchema **************/
const bannerSchema = new Schema({
  "src": String,
  "title": String,
  "describe": String
});
/************** 定义模式articlesSchema **************/
const articlesSchema = new Schema({
  "type": Number,
  "parent": Number,
  "title": String,
  "img": String,
  "from": String,
  "time": String,
  "desc": String,
  "content": String,
  "read": Number,
  "leavs": [new Schema({
    "name": String,
    "email": String,
    "content": String,
    "time": String,
    "avatar": String
  })],
  "label": Array
});

/************** 定义模型Model **************/
const Models = {
  Banner: mongoose.model('index_banner', bannerSchema),       //banner
  Articles: mongoose.model('index_articles', articlesSchema)  //articles
};

module.exports = Models;
