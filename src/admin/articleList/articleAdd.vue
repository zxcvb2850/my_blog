<template>
  <div class="add-article">
    <div class="edit_container">
      <span>标题:</span>
      <!--<el-input v-model="form.title"></el-input>-->
      <quill-editor v-model="content"
                    ref="myQuillEditor"
                    class="editer"
                    :options="editorOption">
      </quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        editorOption: {},
        content: '',
        form: {
          title: ''
        }
      }
    },
    methods: {
      submit(){
        console.log(this.content)
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-article {
    .edit_container {
      padding: 40px;
      margin-bottom: 40px;
    }
    .editer {
      height: 350px;
    }
    .submit_btn {
      text-align: center;
    }
  }
</style>
