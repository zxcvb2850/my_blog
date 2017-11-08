/**
 * Created by wang on 2017/10/26.
 */

//识别换行符
export function wrapLine(val) {
  return val.replace(/[\n]/g, "<br/>");
};

//去除数组中重复的值
export function unique(arr) {
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

//文章路由
export function pathRouter(item) {
  let parent = item.parent;
  let type = '';
  if (parent === 2) {
    switch (item.type) {
      case 1:
        type = 'web';
        break;
      case 2:
        type = 'node';
        break;
      case 3:
        type = 'vue';
        break;
      default:
        type = 'web';
    }
  }
  return type;
}
