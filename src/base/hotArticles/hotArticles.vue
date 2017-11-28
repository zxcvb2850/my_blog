<template>
  <div class="hot">
    <h4 class="title">热门文章</h4>
    <ul>
      <li v-for="item in hotArticle" class="hot-item">
        <time>{{item.time}}</time>
        <a class="hot-title" href="javascript:;" @click="thisArticle(item)" :title="item.title">{{item.title}}</a>
        <span class="read">阅读：{{item.read}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from "axios"
  import {pathRouter} from "common/js/util"

  export default {
    data(){
      return {
        hotArticle: []
      }
    },
    created(){
      setTimeout(() => {
        this._getHotArticle();
      }, 200)
    },
    methods: {
      thisArticle(item){
        let type = pathRouter(item);
        this.$router.push({
          path: `/index/${type}/${item._id}`
        });

        //监听子组件的点击事件
        this.$emit('detailClick', item);
      },
      _getHotArticle(){
        axios.get('/blog/articles/hot/get')
          .then((res) => {
            res = res.data;
            this.hotArticle = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

  .hot {
    .title {
      margin: 10px 0 0;
      padding: 10px;
      border-bottom: 2px solid #42b983;
    }
    ul {
      margin: 0;
      padding: 10px 0;
    }
    .hot-item {
      list-style-type: none;
      margin: 5px 0;
      display: flex;
      height: @textHeight;
      line-height: @textHeight;
      overflow: hidden;
      time {
        flex: 30px 0 0;
        margin-right: 6px;
        padding: 0 8px;
        font-size: @smallerFontSize;
        background-color: @dateBackground;
        color: @snowColor;
        .border-radius(10px);
      }
      .hot-title {
        margin: 0;
        padding: 0;
        flex: 1;
        font-size: @smallFontSize;
        .no-wrap;
        &:hover {
          color: @hotColor;
          text-decoration: underline;
        }
      }
      .read {
        flex: 0 0 80px;
        color: @infoColor;
        font-size: @smallerFontSize;
      }
    }
  }
</style>
