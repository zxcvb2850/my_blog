<template>
  <div class="hot">
    <h4 class="title">热门文章</h4>
    <ul>
      <li v-for="item in hotArticle" class="hot-item">
        <time>{{item.time}}</time>
        <a class="hot-title" href="javascript:;" @click="thisArticle(item)">{{item.title}}</a>
        <span class="read">阅读：{{item.read}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data(){
      return {
        hotArticle: []
      }
    },
    created(){
      setTimeout(() => {
        this._getHotArticle();
        console.log(this.hotArticle);
      }, 200)
    },
    methods: {
      thisArticle(item){
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
          this.$router.push({
            path: `/${type}/${item._id}`
          });
        }
      },
      _getHotArticle(){
        axios.get('/api/articles/hot/get')
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
    ul{
      margin: 0;
      padding: 10px 0;
    }
    .hot-item {
      list-style-type: none;
      margin: 5px 0;

      height: @textHeight;
      line-height: @textHeight;
      overflow: hidden;
      time {
        float: left;
        margin-right: 10px;
        padding: 0 10px;
        font-size: @smallFontSize;
        background-color: @dateBackground;
        color: @snowColor;
        .border-radius(10px);
      }
      .hot-title {
        margin: 0;
        padding: 0;
        .no-wrap;
        &:hover {
          color: @hotColor;
          text-decoration: underline;
        }
      }
      .read{
        float: right;
        color: @infoColor;
        font-size:@smallFontSize;
      }
    }
  }
</style>
