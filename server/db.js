/**
 * Created by wang on 2017/10/17.
 * 连接MongoDB
 */

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test');

//为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successes'));

/************** 定义模式loginSchema **************/
const loginSchema = mongoose.Schema({
  account: String,
  password: String
});
const userSchema = mongoose.Schema({
  user: String,
  age: Number
});

/************** 定义模型Model **************/
const Models = {
  Login: mongoose.model('Login', loginSchema),
  User: mongoose.model('User', userSchema)
};

module.exports = Models;
