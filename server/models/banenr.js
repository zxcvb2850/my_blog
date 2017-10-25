/**
 * Created by wang on 2017/10/25.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/************** 定义模式bannerSchema **************/
const bannerSchema = new Schema({
  "src": {type: String},
  "title": String,
  "describe": String
});

module.exports = mongoose.model('index_banner', bannerSchema);
