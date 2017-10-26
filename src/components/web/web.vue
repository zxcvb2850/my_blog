<template>
  <article class="art-web">
    <router-view></router-view>
  </article>
</template>

<script>
  import {mapGetters} from "vuex"

  export default {
    computed: {
      ...mapGetters([
        'article'
      ])
    }
  }
</script>

<style lang="less">
  .art-web {

  }
</style>
