<template>
  <div id="app">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import VHeader from "components/header/header"
  import VFooter from "components/footer/footer"

  export default {
    name: 'app',
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style>
  html {
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
  }
  a{
    text-decoration: none;
    color: #2c3e50;
  }

  #app {
    font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
