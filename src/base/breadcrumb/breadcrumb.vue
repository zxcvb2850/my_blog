<template>
  <div class="crumbs">
    <ul>
      <router-link tag="li" v-for="item in breadList" :key="item._id" :to="{ path: item.path }">
        <a href="javascript:;">{{item.title}}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        breadList: {} // 路由集合
      }
    },
    watch: {
      $route () {
        this.getBreadcrumb();
      }
    },
    created(){
      this.getBreadcrumb();
    },
    methods: {
      getBreadcrumb (){
        let pathRouter = this.$route.path;
        let router = pathRouter.split('/');
        let abc = '';
        for (let i = 0; i < router.length; i++) {
          let str = `"title":"${router[i]}","path":"/${router[i]}"`;
          abc += `{${str}},`;
        }
        let a = `[${abc.substr(0, abc.length - 1)}]`;
        this.breadList = JSON.parse(a);
        this.breadList[0].title = "首页";
        this.breadList[0].path = "/index";
        this.breadList[this.breadList.length - 1].title = this.$route.name;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

  @borderHeight: 18px;

  .crumbs {
    overflow: hidden;
    ul {
      list-style: none;
      li {
        &:first-child a {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        &:last-child a {
          pointer-events: none; //禁止点击
        }

        &:first-child a:before {
          display: none;
        }

        &:last-child a {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        &:last-child a:after {
          display: none;
        }
        a {
          float: left;
          margin-right: 22px;
          display: inline-block;
          position: relative;
          height: 26px;
          line-height: 26px;
          padding: 4px 8px 4px 8px;
          text-align: center;
          background-color: #3498db;
          color: #fff;
          text-decoration: none;
          font-size: @smallFontSize;
          &:after {
            content: "";
            border-left: @borderHeight solid green;
            border-top: @borderHeight solid red;
            border-bottom: @borderHeight solid red;
            position: absolute;
            right: -@borderHeight;
            top: 0;
            border-left: @borderHeight solid #3498db;
            border-top: @borderHeight solid transparent;
            border-bottom: @borderHeight solid transparent;
          }
          &:before {
            content: "";
            border-top: @borderHeight solid #3498db;
            border-bottom: @borderHeight solid #3498db;
            border-left: @borderHeight solid transparent;
            position: absolute;
            top: 0;
            left: -@borderHeight;
          }
          &:hover {
            background-color: #832700;
          }
          &:hover:after {
            border-left-color: #832700;
          }
          &:hover:before {
            border-top-color: #832700;
            border-bottom-color: #832700;
          }
        }
      }
    }
  }
</style>
