<template>
  <ul class="list">
    <li class="list-item" v-for="article in articles">
      <a class="title" href="javascript:;" @click="detailedArticle(article)"><h3>{{article.title}}</h3></a>
      <div class="img" @click="detailedArticle(article)"><img :src="article.img" alt=""></div>
      <p class="desc">{{article.desc}}...</p>
      <div class="label">
        <a href="javascript:;" class="read"
           @click="detailedArticle(article)">阅读次数：{{article.read}}&nbsp;&nbsp;&nbsp;</a>
        <a href="javascript:;" class="leaving">留言：{{article.leavs.length}}</a>
        <ol>
          <li class="label-item" v-for="label in article.label">
            <a href="javascript:;">{{label}}</a>
          </li>
        </ol>
      </div>
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters} from "vuex"

  export default {
    props: {
      articles: {
        type: Array,
        default: null
      }
    },
    methods: {
      detailedArticle(item){
        this.$router.push({
          path: `/web/${item._id}`
        });
        this.setRouter(`/web/${item.title}`)
        setTimeout(() => {
          this.setArticle(item)
        }, 200)
      },
      ...mapMutations({
        'setArticle': 'SET_ARTICLE',
        'setRouter': 'SET_PATHROUTER'
      }),
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

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
</style>
