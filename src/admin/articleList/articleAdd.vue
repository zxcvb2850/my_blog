<template>
  <div class="add-article">
    <div class="edit_container">
      <el-form :model="addArt" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题:">
          <el-input type="text" auto-complete="off" v-model="addArt.title"></el-input>
        </el-form-item>
        <el-form-item label="文章描述:">
          <el-input type="text" auto-complete="off" v-model="addArt.desc"></el-input>
        </el-form-item>
        <el-form-item label="文章类型:">
          <el-select v-model="addArt.defaultArt" clearable placeholder="请选择文章类型">
            <el-option label="文章" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章分类:">
          <el-select v-model="addArt.defaultType" clearable placeholder="请选择">
            <el-option v-for="item in optionType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章来自:">
          <el-input type="text" auto-complete="off" v-model="addArt.from"></el-input>
        </el-form-item>
        <el-form-item label="文章图片:">
          <el-upload
            class="avatar-uploader"
            action="/blog/admin/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="addArt.imageUrl" :src="addArt.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="文章内容:">
          <quill-editor v-model="addArt.content"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption">
          </quill-editor>
        </el-form-item>

        <el-form-item label="文章标签:">
          <el-tag
            size="small"
            :key="tag"
            v-for="tag in addArt.dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ New Tag</el-button>
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
    data(){
      return {
        loading: true,
        optionArt: [{
          value: '2',
          label: '文章'
        }],
        optionType: [{
          value: '1',
          label: 'web前端'
        }, {
          value: '2',
          label: 'node'
        }, {
          value: '3',
          label: 'vue'
        }],
        editorOption: {},
        addArt: {                 //文章表单
          title: '',                 //文章标题
          desc: '',                      //文章描述
          defaultType: '1',                 //文章类型
          defaultArt: '2',                  //文章分类
          from: '',                     //文章来自
          imageUrl: '',                     //文章图片
          content: '',                      //文章内容
          dynamicTags: []      //文章标签
        },
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose(tag) {
        console.log(tag);
        this.addArt.dynamicTags.splice(this.addArt.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.addArt.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      handleAvatarSuccess(res, file) {
        if (res.status === 200) {
          this.addArt.imageUrl = res.url
          this.$message({
            message: res.msg,
            type: 'success'
          });
        } else {
          this.open("服务器错误", res.msg);
        }

        //this.addArt.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(){
        console.log(this.addArt)
        this.loading = true;
        axios.post('/blog/articles/add/post', {
          title: this.addArt.title,
          type: this.addArt.defaultType,
          parent: this.addArt.defaultArt,
          desc: this.addArt.desc,
          from: this.addArt.from,
          img: this.addArt.imageUrl,
          content: this.addArt.content,
          label: this.addArt.dynamicTags
        })
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              });

              //发表成功清空表单
              this.addArt.title = ''
              this.addArt.defaultType = '1'
              this.addArt.defaultArt = '2'
              this.addArt.desc = ''
              this.addArt.from = ''
              this.addArt.imageUrl = ''
              this.addArt.content = ''
              this.addArt.dynamicTags = []
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
            this.loading = false
          })
          .catch((err) => {
            this.open("服务器错误", err);
          })
      },
      open(title, content){
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
