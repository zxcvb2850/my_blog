<template>
  <div class="itemize">
    <div class="new-left">
      <bread-crumb></bread-crumb>
      <articles-list :articles="webArticles"></articles-list>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import articlesList from "base/articlesList/articlesList"
  import breadCrumb from 'base/breadcrumb/breadcrumb'

  export default {
    data(){
      return {
        webArticles:[]
      }
    },
    created(){
      this._getArticles();
    },
    methods: {
      _getArticles(){
        axios.get("/api/articles/get?type=3").then((res) => {
          res = res.data;
          if (res.status === 200) {
            this.webArticles = res.data;
          }
        }).catch((err) => {
          console.log("获取失败");
          console.log(err);
        })
      },
    },
    components: {
      articlesList,
      breadCrumb
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

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
    .list {
      padding: 0 30px;
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
          display: inline-block;
          margin: 2px;
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
    .label {
      margin-top: 20px;
      .label-item {
        display: inline-block;
        margin: 4px 0px;
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
</style>
