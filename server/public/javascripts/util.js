/**
 * Created by wang on 2017/10/31.
 */
const common = require('./common');

exports.getNowDate = (val) => {
  var oDate = new Date(val);
  let year = oDate.getFullYear(),
    month = common.Zerofill(oDate.getMonth() + 1),
    day = common.Zerofill(oDate.getDate()),
    hour = common.Zerofill(oDate.getHours()),
    minute = common.Zerofill(oDate.getMinutes()),
    second = common.Zerofill(oDate.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
