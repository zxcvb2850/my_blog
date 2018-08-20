# my_blog

> wangxiaobai blog

# 使用的工具
  1. 前端使用的是vue-cli
  2. 服务器采用的是node
  3. 数据库采用的是mongodb

### [线上地址](http://www.qhyking.com:9000)

## mongodb对应的结构
> banner
```banner对应的模型
/************** 定义模式bannerSchema **************/
const bannerSchema = new Schema({
  "src": String,
  "title": String,
  "desc": String,
  "time": Date
});
```
>文章
```文章对应的模型
/************** 定义模式articlesSchema **************/
const articlesSchema = new Schema({
  "type": Number,
  "parent": Number,
  "status": Number,
  "title": String,
  "img": String,
  "from": String,
  "time": Date,
  "timeMod": Date,
  "desc": String,
  "content": String,
  "read": Number,
  "leavs": [new Schema({
    "name": String,
    "email": String,
    "content": String,
    "time": Date,
    "avatar": String
  })],
  "label": Array
});
```
> 后台管理用户
```后台user对应的模型
/************** 定义模式userSchema **************/
const userSchema = new Schema({
  "username": String,
  "password": String,
  "time": String
});
```

## Build Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# server monitor 8088
npm run start-server

# production access address
localhost:8088            this is index page
localhost:8088/admin      this is admin page, user and password is you mongodb users
```
