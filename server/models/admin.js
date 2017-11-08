/**
 * Created by wang on 2017/11/8.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/my_blog');

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected success.")
});
mongoose.connection.on("error", () => {
  console.log("MongoDB connected fail.")
});
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB connected disconnected.")
});

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
