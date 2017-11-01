/**
 * Created by wang on 2017/11/1.
 */

//日期补零
exports.Zerofill = (val) => {
  return val >= 10 ? val : '0' + val;
}
