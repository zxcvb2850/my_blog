/**
 * Created by wang on 2017/10/17.
 */
//引入api
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const api = require("./api");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
//访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html);
})

//监听8088端口
app.listen(8088);
console.log('success listen 8088');
