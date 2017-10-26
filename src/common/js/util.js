/**
 * Created by wang on 2017/10/26.
 */

//识别换行符
export const wrapLine = (val) => {
  return val.replace(/[\n]/g, "<br/>");
}
