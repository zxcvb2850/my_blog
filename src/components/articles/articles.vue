<template>
  <div class="detail">
    <div class="detail-left">
      <breadCrumb></breadCrumb>
      <div class="content">
        <h1 class="title">{{article.title}}</h1>
        <p class="time">{{article.time}} (<span class="from">{{article.from}}</span>) 阅读次数：{{article.read}}</p>
        <p class="content" v-html="this._wrapLine(article.content)"></p>
      </div>
      <div class="label">
        <a href="javascript:;" class="read"
           @click="detailedArticle(article)">阅读次数：{{article.read}}&nbsp;&nbsp;&nbsp;</a>
        <a href="javascript:;" class="leaving">留言（{{article.leavs.length}}）</a>
        <ol>
          <li class="label-item" v-for="label in article.label">
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
  import {mapGetters} from 'vuex'
  import breadCrumb from 'base/breadcrumb/breadcrumb.vue'

  export default {
    mounted(){
      setTimeout(() => {
        this._getPath();
      }, 200)
    },
    methods: {
      _wrapLine(val){
        return val.replace(/[\n]/g, "<br/>");
      },
      _getPath(){
        if (!this.article._id) {
          this.$router.back();
        }
      }
    },
    computed: {
      ...mapGetters(['article'])
    },
    components: {
      breadCrumb
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
