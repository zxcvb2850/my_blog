/**
 * Created by wang on 2017/11/15.
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

//设置cookie
export function setCookie(cname, cvalue, time) {
  let d = new Date();
  d.setTime(d.getTime() + (time));
  let expires = "expires=" + d.toUTCString();
}

//获取cookie
export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
  }
  return "";
}

//清除cookie
export function clearCookie(name) {
  this.setCookie(name, "", -1);
}
