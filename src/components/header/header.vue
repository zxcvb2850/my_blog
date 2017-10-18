<template>
  <header>
    <div class="wrapper">
      <div class="head-top">
        <p class="welcome">欢迎来到王小白的博客</p>
        <p class="icon">11</p>
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
    padding: 0;
    height: @topHeight;
    background-color: @backgroundTop;
    .wrapper {
      margin: 0 auto;
      max-width: 1000px;
      .head-top {
        color: @snowColor;
        height: @topHeight;
        line-height: @topHeight;
        .clear;
        .welcome, .icon {
          margin: 0;
          padding: 0;
          font-size: @smallFontSize;
        }
        .welcome {
          float: left;
          height: @topHeight;
          line-height: @topHeight;
        }
        .icon {
          float: right;
        }
      }
    }
  }
</style>
