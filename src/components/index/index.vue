<template>
  <article class="art-index">
    <div class="slider-wrapper">
      <slider>
        <div class="slider-item" v-for="item in banner">
          <img :src="item.imgScr" alt="">
        </div>
      </slider>
    </div>
    <div class="itemize">
      <div class="new-left">
        <h1 class="art-title">最新发布</h1>
        <ul class="list">
          <li class="list-item">
            <a class="title" href="#"><h3>HTML5-CSS3</h3></a>
            <div class="img"><img src="../../assets/2.jpg" alt=""></div>
            <p class="desc">
              “移动端H5页面设计”赛项共分作品提交、现场答辩两个阶段，比赛要求学生利用HTML5-CSS3技术进行开发，需要选手设计开发5～15屏页面，兼容手机竖屏浏览，作品可在iOS和Android操作系统移动终端设备上运行。

              谈到参加这次比赛...</p>
            <div class="label">
              <a href="javascript;" class="read">阅读次数：2 &nbsp;&nbsp;&nbsp;</a>
              <a href="javascript;" class="leaving">留言（10）</a>
              <ol>
                <li class="label-item"><a href="javascript;">web前端</a></li>
              </ol>
            </div>
          </li>
          <li class="list-item">
            <a class="title" href="#"><h3>HTML5-CSS3</h3></a>
            <div class="img"><img src="../../assets/4.jpg" alt=""></div>
            <p class="desc">
              “移动端H5页面设计”赛项共分作品提交、现场答辩两个阶段，比赛要求学生利用HTML5-CSS3技术进行开发，需要选手设计开发5～15屏页面，兼容手机竖屏浏览，作品可在iOS和Android操作系统移动终端设备上运行。

              谈到参加这次比赛...</p>
            <div class="label">
              <a href="javascript;" class="read">阅读次数：2 &nbsp;&nbsp;&nbsp;</a>
              <a href="javascript;" class="leaving">留言（10）</a>
              <ol>
                <li class="label-item"><a href="javascript;">web前端</a></li>
              </ol>
            </div>
          </li>
          <li class="list-item">
            <a class="title" href="#"><h3>HTML5-CSS3</h3></a>
            <div class="img"><img src="../../assets/3.jpg" alt=""></div>
            <p class="desc">
              “移动端H5页面设计”赛项共分作品提交、现场答辩两个阶段，比赛要求学生利用HTML5-CSS3技术进行开发，需要选手设计开发5～15屏页面，兼容手机竖屏浏览，作品可在iOS和Android操作系统移动终端设备上运行。

              谈到参加这次比赛...</p>
            <div class="label">
              <a href="javascript;" class="read">阅读次数：2 &nbsp;&nbsp;&nbsp;</a>
              <a href="javascript;" class="leaving">留言（10）</a>
              <ol>
                <li class="label-item"><a href="javascript;">web前端</a></li>
              </ol>
            </div>
          </li>
        </ul>
      </div>
      <div class="rec-right">
        <div class="new-comment">
          <h4 class="new-title">最新评论</h4>
          <ul>
            <li class="comment-item">
              <a class="content" href="javascript:;">计开发5～15屏页面，兼容手机计开发5～15屏页面，兼容手机</a>
              <div class="info">
                <img class="avatar" src="../../assets/logo.png" alt="">
                <span class="username">提供者</span>
              </div>
            </li>
            <li class="comment-item">
              <a class="content" href="javascript:;">计开发5～15屏页面，兼容手机计开发5～15屏页面，兼容手机</a>
              <div class="info">
                <img class="avatar" src="../../assets/logo.png" alt="">
                <span class="username">提供者</span>
              </div>
            </li>
            <li class="comment-item">
              <a class="content" href="javascript:;">计开发5～15屏页面，兼容手机计开发5～15屏页面，兼容手机</a>
              <div class="info">
                <img class="avatar" src="../../assets/logo.png" alt="">
                <span class="username">提供者</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import Slider from "base/slider/slider"

  export default {
    data(){
      return {
        banner: [
          {
            imgScr: require("../../assets/2.jpg")
          },
          {
            imgScr: require("../../assets/3.jpg")
          },
          {
            imgScr: require("../../assets/4.jpg")
          }
        ]
      }
    },
    components: {
      Slider
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

  .art-index {
    margin: 0;
    width: 100%;
    .slider-wrapper {
      position: relative;
      top: 10px;
      width: 100%;
      overflow: hidden;
    }
    .itemize {
      display: flex;
      margin: 20px auto;
      max-width: @pageWidth;
    }
    .new-left {
      padding: 0 10px;
      .border-box;
      .art-title {
        flex: 1;
        font-size: @titleFontSize;
      }
      .list-item {
        list-style-type: none;
        position: relative;
        margin: 50px 0 20px;
        &:first-child {
          margin-top: 0;
        }
        .title {
          margin-bottom: 10px;
          padding-left: 60px;
          display: block;
          height: @titleHeight;
          line-height: @titleHeight;
          .transition(all, 0.35s);
          &:hover {
            padding-left: 20px;
            text-decoration: underline;
          }
          h3 {
            margin: 0;
          }
        }
        .img {
          width: 100%;
          img {
            width: 100%;
          }
        }
        .desc {
          padding: 0 20px;
          .border-box;
        }
        .label {
          padding: 0 20px;
          height: @textHeight;
          line-height: @textHeight;
          font-size: @smallFontSize;
          .border-box;
          .read, .leaving {
            display: inline-block;
            .transition(all, 0.35s);
            &:hover {
              -webkit-transform: scale(1.1, 1.1);
              -moz-transform: scale(1.1, 1.1);
              -ms-transform: scale(1.1, 1.1);
              -o-transform: scale(1.1, 1.1);
              transform: scale(1.1, 1.1);
            }
          }
          ol {
            list-style-type: none;
            float: right;
          }
          .label-item {
            padding: 0 6px;
            background-color: @labelBackground;
            .transition(all, 0.35s);
            &:hover {
              transform: rotate(360deg);
              background-color: @labelHoverBackground;
            }
            a {
              display: block;
              color: #fff;
            }
          }
        }
      }
    }
    .rec-right {
      flex: 0 0 300px;
      align-self: flex-start;
      margin-top: 80px;
      padding: 0 20px;
      border-left: 1px solid @borderColor;
      overflow: hidden;
      .border-box;
      .new-title {
        margin: 10px 0 0;
        padding: 10px;
        border-bottom: 2px solid #42b983;
      }
      ul {
        margin: 0;
        padding: 0;
      }
      .comment-item {
        list-style-type: none;
        padding: 10px 0;
        .border-1px(@borderColor);
        .content {
          display: block;
          margin: 0;
          padding: 6px 0;
          font-size: @smallFontSize;
          .no-wrap;
        }
        .info {
          margin: 0;
          padding-left: 10px;
          .avatar {
            padding-right: 10px;
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }
          .username {
            display: inline-block;
            width: 180px;
            font-size: @smallFontSize;
            vertical-align: middle;
            .no-wrap;
          }
        }
      }
    }
  }
</style>
