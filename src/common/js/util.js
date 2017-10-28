/**
 * Created by wang on 2017/10/26.
 */

//识别换行符
export const wrapLine = (val) => {
  return val.replace(/[\n]/g, "<br/>");
};

//去除数组中重复的值
export const unique = (arr) => {
  var tmp = {};
  for (var i = 0; i < arr.length; i++) {
    tmp[arr[i]] = 1;
  }
  var r = [];
  for (var k in tmp) {
    r.push(k);
  }
  return r;
}
