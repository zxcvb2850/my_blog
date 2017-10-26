<template>
  <header>
    <div class="wrapper">
      <div class="logo"><img src="../../assets/logo.png" alt=""></div>
      <nav class="nav">
        <router-link class="nav-item" to="/index" tag="li"><a href="">首页</a></router-link>
        <router-link class="nav-item" to="/web" tag="li"><a href="">前端</a></router-link>
        <router-link class="nav-item" to="/message" tag="li"><a href="">留言板</a></router-link>
      </nav>
      <div class="search">
        <router-link to="/search">search</router-link>
      </div>
    </div>
  </header>
</template>

<script>
  export default {}
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
          list-style-type: none;
          display: inline-block;
          height: @topHeight;
          line-height: @topHeight;
          font-size: @fontSize;
          a {
            padding: 0 20px;
            display: block;
          }
          &.active a {
            color: #ff8aaf;
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
