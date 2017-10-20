<template>
  <footer>
    <h2 class="title">王小白</h2>
    <div class="share">
      <ul class="tool">
        <li class="item">QQ</li>
        <li class="item">微博</li>
        <li class="item">邮件</li>
      </ul>
    </div>
    <p class="footer-info">Copyright © 2017 王小白</p>
  </footer>
</template>

<script>
  export default {}
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

  footer {
    padding: 20px 0 10px;
    width: 100%;
    text-align: center;
    background-color: @footerBackground;
    .title {
      color: @snowColor;
    }
    .share {
      list-style-type: none;
      text-align: center;
      font-size: 0;
      .tool {
        padding: 0;
        margin: 40px 0;
      }
      .item {
        display: inline-block;
        width: @topHeight;
        height: @topHeight;
        line-height: @topHeight;
        text-align: center;
        color: #000;
        font-size: @maxFontSize;
        background-color: @snowColor;
        cursor: pointer;
        .border-radius(50%);
        .transition(all, 0.35s);
        &:nth-child(odd) {
          margin: 0 10px;
        }
        &:hover {
          color: @snowColor;
          background-color: @footerBackground;
        }
      }
    }
    .footer-info {
      margin: 0;
      padding: 0 0 10px;
      color: @snowColor;
    }
  }
</style>
