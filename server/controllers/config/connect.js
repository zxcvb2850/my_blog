const mongodb = require('mongodb');
const config = require('./config');

//服务器配置
const host = config.host;
const port = config.port;       //    MongoDB数据库默认的端口号

let server = new mongodb.Server(host, port, {auto_reconnect: true});
let db = new mongodb.Db('my_blog', server, {salf: true});

module.exports = db;

