<template>
  <div class="slider-wrapper">
    <el-carousel :interval="4000" trigger="click">
      <slot></slot>
    </el-carousel>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="less">
  .slider-wrapper {
    overflow: hidden;
    .el-carousel {
      height: 500px;
    }
  }

  .el-carousel__container {
    width:100%;
    height: 100%;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
      &:nth-child(2n) {
        background-color: #99a9bf;
      }
      &:nth-child(2n+1) {
        background-color: #d3dce6;
      }
      img {
        width: 100%;
      }
    }
  }
</style>
