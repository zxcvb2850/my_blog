<template>
  <div>
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
        <div class="pagenation">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next, total"
                         :total="count">
          </el-pagination>
        </div>
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
              <a class="text" href="javascript:;">
                <el-tag size="medium">{{label}}</el-tag>
              </a>
            </li>
          </ul>
        </div>
        <hot-articles @detailClick="detailClick"></hot-articles>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import moment from "moment"
  import Slider from "base/slider/slider"
  import articlesList from "base/articlesList/articlesList"
  import hotArticles from "base/hotArticles/hotArticles"
  import {unique} from "common/js/util"

  export default {
    data() {
      return {
        banners: [],
        articles: [],
        labels: [],
        pageSize: 2,
        count: 0
      }
    },
    mounted(){
      this._getBanner();
      this._getLabels();
    },
    methods: {
      handleCurrentChange(val) {
        this._getArticles(val);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      detailClick(){

      },
      //获取banner
      _getBanner(){
        axios.get("/blog/banner/get").then((res) => {
          res = res.data;
          if (res.status === 200) {
            this.banners = res.data;
          }
        }).catch((err) => {
          console.log("获取banner报错啦");
          console.log(err);
        })
      },
      //获取文章
      _getArticles(page = 1){
        axios.get(`/blog/articles/get?page=${page}&rows=${this.pageSize}`).then((res) => {
          res = res.data;
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].time = moment(res.data[i].time).format("LLL");
            }
            this.count = res.count;
            this.articles = res.data;
          }
        }).catch((err) => {
          console.log("获取失败");
          console.log(err);
        })
      },
      //获取标签
      _getLabels(){
        axios.get("/blog/label").then((res) => {
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
            this.labels = unique(arr);
          }
        })
      }
    },
    components: {
      Slider,
      articlesList,
      hotArticles
    },
    activated(){
      this._getArticles();
    }
  }
</script>

<style lang="less">
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
      .pagenation {
        margin: 30px 50px;
        .el-pagination {
          .el-pager {
            li.active {
              .border-radius(3px);
              color: #FFF;
              background-color: @adminMainBackground;
            }
          }
          .btn-next, .btn-prev {
            .border-radius(3px);
            color: #FFF;
            background-color: @adminMainBackground;
            &.disabled {
              color: @adminMainBackground;
              background-color: #FFF;
            }
          }
          .el-pagination__total {
            float: right;
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
          margin: 4px 6px;
          font-size: 0;
          &:hover {
            color: @snowColor;
            span {
              color: red;
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
