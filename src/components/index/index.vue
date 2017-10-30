<template>
  <article class="art-index">
    <div v-if="banners.length" class="slider-wrapper">
      <slider>
        <div v-for="banner in banners" class="slider-item">
          <img class="needsclick" :src="banner.src" alt="">
        </div>
      </slider>
    </div>
    <div class="itemize">
      <div class="new-left">
        <h1 class="art-title">最新发布</h1>
        <articles-list :articles="articles"></articles-list>
      </div>
      <div class="rec-right">
        <div class="new-comment">
          <h4 class="new-title">最新评论</h4>
          <ul class="comment">
            <li class="comment-item">
              <a class="content" href="javascript:;">计开发5～15屏页面，兼容手机计开发5～15屏页面，兼容手机</a>
              <div class="info">
                <img class="avatar" src="../../assets/logo.png" alt="">
                <span class="username">提供者</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="new-label">
          <h4 class="new-title">热门标签</h4>
          <ul class="label">
            <li class="label-item" v-for="label in labels">
              <a class="text" href="javascript:;">{{label}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import axios from "axios"
  import Slider from "base/slider/slider"
  import articlesList from "base/articlesList/articlesList"
  //import {unique} from "common/js/util"

  export default {
    data() {
      return {
        banners: [],
        articles: [],
        labels: [],
      }
    },
    mounted(){
      this._getBanner();
      this._getLabels();
    },
    methods: {
      _getBanner(){
        axios.get("/api/banner/get").then((res) => {
          res = res.data;
          if (res.status === 200) {
            this.banners = res.data;
          }
        }).catch((err) => {
          console.log("获取banner报错啦");
          console.log(err);
        })
      },
      _getArticles(){
        axios.get("/api/articles/get").then((res) => {
          res = res.data;
          if (res.status === 200) {
            this.articles = res.data;
          }
        }).catch((err) => {
          console.log("获取失败");
          console.log(err);
        })
      },
      _getLabels(){
        axios.get("/api/label").then((res) => {
          res = res.data;
          if (res.status === 200) {
            let label = res.data;
            let arr = [];
            for (let i = 0; i < label.length; i++) {
              let item = label[i].label;
              for (let j = 0; j < item.length; j++) {
                arr.push(item[j]);
              }
            }
            this.labels = this.unique(arr);
          }
        })
      },
      unique(arr){
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
    },
    components: {
      Slider,
      articlesList
    },
    activated(){
      this._getArticles();
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
      .transition(all, 0.35s);
      .border-box;
      .art-title {
        flex: 1;
        font-size: @titleFontSize;
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
      .label {
        margin-top: 20px;
        .label-item {
          display: inline-block;
          margin: 4px 6px;
          font-size: 0;
          .text {
            display: block;
            padding: 6px 10px;
            border: 1px solid #888;
            font-size: @smallFontSize;
            color: #888;
            &.hot {
              border: 1px solid @hotColor;
              color: @hotColor;
            }
          }
          &:hover {
            .text {
              background-color: #282828;
              color: @snowColor;
            }
          }
        }
      }
    }
  }

  @media (max-width: 992px) {
    .new-left {
      .art-title {
        text-align: center;
      }
    }

    .rec-right {
      display: none;
    }
  }
</style>
