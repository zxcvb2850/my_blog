var log4js = require('log4js');
log4js.configure({
  appenders: [
    {
      type: "console",
    }, {
      type: "dateFile",
      filename: './server/logs//log/log',//文件目录，当目录文件或文件夹不存在时，会自动创建
      maxLogSize: 10240,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
      backups: 10,//当文件内容超过文件存储空间时，备份文件的数量
      pattern: "_yyyy-MM-dd.log",
      alwaysIncludePattern: true,     //文件名是否始终包含占位符
      absolute: true,                //filename是否绝对路径
      encoding: 'utf-8',//default "utf-8"，文件的编码
      category: "app"
    }
  ],
  replaceConsole: true,
  levels: {
    app: "INFO",     //设置记录器的默认显示级别，低于这个级别的日志，不会输出。其他级别(trace、debug、warn、error、fatal)
  }
});


var dateFileLog = log4js.getLogger('app');
exports.logger = dateFileLog;

exports.use = function (app) {
  //app.use(log4js.connectLogger(dateFileLog, {level:'INFO', format:':method :url'}));
  app.use(log4js.connectLogger(dateFileLog, {level: 'auto', format: ':method :url'}));
}
