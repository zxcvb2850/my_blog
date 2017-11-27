<template>
  <el-button type="text" @click="openData"></el-button>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      }
    },
    methods: {
      open(){
        this.$alert(this.message, this.title, {
          confirmButtonText: '确定'
        });
        console.log(1234)

      },
      openData(){
        this.open();
        this.$emit('open')
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
