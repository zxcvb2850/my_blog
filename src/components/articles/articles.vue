<template>
  <div class="detail">
    <div class="detail-left">
      <breadCrumb></breadCrumb>
      <div class="content">
        <h1 class="title">{{nowArticle.title}}</h1>
        <p class="time">{{nowArticle.time}} (<span class="from">{{nowArticle.from}}</span>) 阅读次数：{{nowArticle.read}}</p>
        <p class="content" v-html="content"></p>
      </div>
      <div class="label">
        <ol>
          <li class="label-item" v-for="label in nowArticle.label">
            <a href="javascript:;">{{label}}</a>
          </li>
        </ol>
      </div>
    </div>
    <div class="detail-right">
      <div class="hot">
        <h3 class="title">热门文章</h3>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import breadCrumb from 'base/breadcrumb/breadcrumb.vue'

  export default {
    data(){
      return {
        nowArticle: [],
        content: ''
      }
    },
    created(){
      setTimeout(() => {
        this._getArticle();
        this.wrapLine();
      }, 200)
    },
    methods: {
      wrapLine(){
        setTimeout(() => {
          let content = this.nowArticle.content;
          if (content) {
            this.content = content.replace(/[\n]/g, "<br/>");
          }
        }, 200)
      },
      _getArticle(){
        this.articleId = this.$route.params.id;
        axios.get(`/api/article/detail?id=${this.articleId}`)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              this.nowArticle = res.data[0];
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("文章获取失败");
          })
      }
    },
    components: {
      breadCrumb
    },
    activated(){
      this._getArticle();
    },
    deactivated(){
      this._getArticle();
    }
  }
</script>

<style lang="less" scoped="">
  @import "~common/style/index.less";

  .detail {
    display: flex;
    .detail-left {
      flex: 1;
      .title {
        text-align: center;
      }
      .time {
        padding: 0;
        font-size: @smallFontSize;
        color: @infoColor;
        text-align: center;
        .from {
          font-size: @smallerFontSize;
        }
      }
      .content {
        padding: 0 30px;
        line-height: @titleFontSize;
        font-size: @fontSize;
        text-indent: 2em;
        text-align: left;
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
    .detail-right {
      flex: 0 0 300px;
      align-self: flex-start;
      margin-top: 80px;
      padding: 0 20px;
      overflow: hidden;
    }
  }

  @media (max-width: 992px) {
    .detail-left {
      .title {
        text-align: center;
      }
    }

    .detail-right {
      display: none;
    }
  }
</style>
