<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import VHeader from "components/header/header"
  import VFooter from "components/footer/footer"

  export default {
    name: 'app',
    watch: {          //切换路由监听滚动条
      '$route': function (to, from) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style lang="less">
  html {
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
  }

  a {
    text-decoration: none;
    color: #2c3e50;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
