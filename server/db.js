/**
 * Created by wang on 2017/10/17.
 * 连接MongoDB
 */

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/my_blog');

//为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successes'));

/************** 定义模式loginSchema **************/
const bannerSchema = mongoose.Schema({
  src: String
});
const userSchema = mongoose.Schema({
  user: String,
  age: Number
});
const articlesSchema = mongoose.Schema({
  title: String,
  img: String,
  desc: String,
  read: Number,
  leaving: Number,
  label: Array
});

/************** 定义模型Model **************/
const Models = {
  Banner: mongoose.model('index_banner', bannerSchema),
  User: mongoose.model('User', userSchema),
  Article: mongoose.model('index_articles', articlesSchema),
};

module.exports = Models;
