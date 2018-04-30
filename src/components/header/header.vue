<template>
  <header>
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <!--<el-menu-item><a href="javascript:;"><img src="../../assets/logo.png" alt=""></a></el-menu-item>-->
      <el-menu-item index="/index">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">文章类型</template>
        <el-menu-item index="/index/web">web前端</el-menu-item>
        <el-menu-item index="/index/node">node</el-menu-item>
        <el-menu-item index="/index/vue">vue</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">留言板</el-menu-item>
    </el-menu>
  </header>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex: 1
      }
    },
    methods: {
      handleSelect(){
        console.log(123)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/mixin.less";

  header {
    margin: 0;
    padding: 0;
    background: #ffffff;
    .border-1px(@borderColor);
    .wrapper {
      display: flex;
      margin: 0 auto;
      width: 80%;
      height: @topHeight;
      .logo {
        flex: 100px 0 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nav {
        flex: 1;
        padding: 0 20px;
        text-align: left;
        font-size: 0;
        .nav-item {
          position: relative;
          list-style-type: none;
          display: inline-block;
          height: @topHeight;
          line-height: @topHeight;
          font-size: @fontSize;
          &:hover {
            .nav-tow {
              display: block;
            }
          }
          a {
            padding: 0 20px;
            display: block;
          }
          &.active a {
            color: #ff8aaf;
          }
        }
        .nav-tow {
          display: none;
          margin: 0;
          padding: 0;
          position: absolute;
          top: @topHeight;
          bottom: 0;
          z-index: 100;
          .transition(all, .35s);
          .item {
            list-style-type: none;
            width: 200px;
            height: @topHeight/2;
            line-height: @topHeight/2;
            background-color: @infoColor;
            &:hover {
              background-color: @footerBackground;
              a {
                color: @hotColor;
              }
            }
          }
        }
      }
      .search {
        flex: 0 0 50px;
        height: @topHeight;
        line-height: @topHeight;
        a {
          display: block;
        }
        a.active {
          color: #ff8aaf;
        }
      }
    }
  }
</style>
