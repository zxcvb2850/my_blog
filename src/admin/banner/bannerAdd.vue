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
    <el-button type="text" @click="open"></el-button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        loading: true,
        editorOption: {},
        addBanner: {                 //文章表单
          title: '我是banner的标题',                 //文章标题
          desc: 'banner描述',                      //文章描述
          imageUrl: '',                     //文章图片
        },
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        if (res.status === 200) {
          this.addBanner.imageUrl = res.url
          this.$message({
            message: res.msg,
            type: 'success'
          });
        } else {
          this.open("服务器错误", res.msg);
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        console.log(file)

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm() {
        let data = {
          title: this.addBanner.title,
          desc: this.addBanner.desc,
          src: this.addBanner.imageUrl
        }
        axios.post('/blog/banner/add/post', data)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              })
            } else {
              this.open('操作提示', res.msg, 'error');
            }
          })
          .catch((err) => {
            this.open('操作提示', '提交失败' + err, 'error')
          })
      },
      open(title, content) {
        this.$alert(content, title, {
          confirmButtonText: '确定'
        });
      }
    },
  }
</script>

<style lang="less">
  @import "~common/style/index.less";

  .add-article {
    .edit_container {
      background-color: @bgBackground;
    }
    .avatar-uploader {
      .el-upload {
        border: 1px dashed #000;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        &:hover {
          border-color: #409EFF;
        }
      }
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 300px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 300px;
      height: 178px;
      display: block;
    }

    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
    .edit_container {
      padding: 40px;
      margin-bottom: 40px;
    }
    .submit_btn {
      text-align: center;
    }
  }
</style>
