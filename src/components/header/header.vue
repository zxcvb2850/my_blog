<template>
  <header>
    <div class="wrapper">
      <div class="logo"><img src="../../assets/logo.png" alt=""></div>
      <nav class="nav">
        <li class="nav-item"><a href="">首页</a></li>
        <li class="nav-item"><a href="">前端</a></li>
        <li class="nav-item"><a href="">cocos2dx-lua</a></li>
        <li class="nav-item"><a href="">留言板</a></li>
      </nav>
      <div class="search">search</div>
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
      width: 1000px;
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
          margin: 0 20px;
          height: @topHeight;
          line-height: @topHeight;
          font-size: @fontSize;
        }
      }
      .search {
        flex: 0 0 50px;
        height: @topHeight;
        line-height: @topHeight;
      }
    }

  }
</style>
