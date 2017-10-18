<template>
  <div id="app">
    <v-header></v-header>
  </div>
</template>

<script>
  import VHeader from "components/header/header"

  export default {
    name: 'app',
    components: {
      VHeader
    }
  }
</script>

<style>
  html {
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
