<template>
  <article class="art-index">
    <v-header></v-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-footer></v-footer>
  </article>
</template>

<script>
  import VHeader from "components/header/header"
  import VFooter from "components/footer/footer"

  export default {
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style lang="less" scoped>

</style>
