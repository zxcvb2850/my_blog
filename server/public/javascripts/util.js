/**
 * Created by wang on 2017/10/31.
 */
const common = require('./common');

exports.getNowDate = (val, boolS = true) => {
  let timer = '';
  let oDate = new Date(parseInt(val));
  let year = oDate.getFullYear(),
    month = common.Zerofill(oDate.getMonth() + 1),
    day = common.Zerofill(oDate.getDate()),
    hour = common.Zerofill(oDate.getHours()),
    minute = common.Zerofill(oDate.getMinutes());
  if (boolS) {
    let second = common.Zerofill(oDate.getSeconds());
    return timer = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  timer = `${year}-${month}-${day} ${hour}:${minute}`;

  return timer;
}
