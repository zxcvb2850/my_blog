<template>
  <header>
    <div class="wrapper">
      <div class="logo"><img src="../../assets/logo.png" alt=""></div>
      <nav class="nav">
        <router-link class="nav-item" to="/index" tag="li"><a href="">首页</a></router-link>
        <li class="nav-item" @click="clickItem('web')">
          <a href="javascript:;">前端</a>
          <ul class="nav-tow">
            <li class="item" @click.stop="clickItem('web')"><a href="">web前端</a></li>
            <li class="item" @click.stop="clickItem('node')"><a href="">node</a></li>
            <li class="item" @click.stop="clickItem('vue')"><a href="">vuejs</a></li>
          </ul>
        </li>
        <router-link class="nav-item" to="/message" tag="li"><a href="">留言板</a></router-link>
      </nav>
      <div class="search">
        <router-link to="/search">search</router-link>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    methods: {
      clickItem(item){
        this.$router.push({
          path: `/${item}`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/mixin.less";

  header {
    margin: 0;
    padding: 0 0 6px 0;
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
