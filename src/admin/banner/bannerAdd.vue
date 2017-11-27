<template>
  <div class="add-article">
    <div class="edit_container">
      <el-form :model="addBanner" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="banner标题:">
          <el-input type="text" auto-complete="off" v-model="addBanner.title"></el-input>
        </el-form-item>
        <el-form-item label="banner描述:">
          <el-input type="text" auto-complete="off" v-model="addBanner.desc"></el-input>
        </el-form-item>
        <el-form-item label="文章图片:">
          <el-upload
            class="avatar-uploader"
            action="/blog/admin/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="addBanner.imageUrl" :src="addBanner.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <a href="javascript:;" @click="open">1111111111</a>
    <data-grid title="我是标题" message="我是内容" @open="open"></data-grid>
  </div>
</template>

<script>
  import axios from 'axios';
  import DataGrid from 'base/datagrid/datagrid'

  export default {
    data(){
      return {
        addBanner: {
          title: '',
          desc: '',
          imageUrl: ''
        }
      }
    },
    created(){
    },
    methods: {
      submitForm(){
        console.log(1)
      },
      handleAvatarSuccess(){

      },
      beforeAvatarUpload(){

      },
      open(){
          console.log(1)
      }
    },
    components: {
      DataGrid
    }
  }
</script>

<style lang="less">
  @import "~common/style/index.less";
</style>
