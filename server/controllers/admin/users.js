/**
 * Created by wang on 2017/11/8.
 */
const models = require('../../models/admin');
const log4js = require('log4js');
const util = require('../../public/javascripts/util');
const common = require('../../public/javascripts/common');

log4js.configure(
  {
    appenders: {
      file: {
        type: 'file',
        filename: './server/logs/test.log',//文件目录，当目录文件或文件夹不存在时，会自动创建
        maxLogSize: 102400,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
        backups: 3,//当文件内容超过文件存储空间时，备份文件的数量
        compress: false,//是否以压缩的形式保存新文件,默认false。如果true，则新增的日志文件会保存在gz的压缩文件内，并且生成后将不被替换，false会被替换掉
        encoding: 'utf-8',//default "utf-8"，文件的编码
        category: 'admin',
        numBackups: 5, // keep five backup files
        pattern: 'yyyy-MM-dd-hh'
      },
      out: {
        type: 'stdout'
      }
    },
    categories: {
      default: {appenders: ['file', 'out'], level: 'error'}
    }
  }
);
var logger = log4js.getLogger('admin');

const ERR_OK = 200;
const ERROR = -1;

exports.login = (req, res, next) => {
  console.log(124)
  res.send('错误');
}

