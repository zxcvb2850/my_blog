/**
 * Created by wang on 2017/11/8.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/************** 定义模式userSchema **************/
const userSchema = new Schema({
  "username": String,
  "password": String,
  "time": String
});

/************** 定义模型Model **************/
const Models = {
  User: mongoose.model('admin_users', userSchema),       //user
};

module.exports = Models;
