<template>
  <div class="article-list">
    <el-table v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteBanner">删 除</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog center title="修改banner" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="editBanner">
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="editBanner.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth">
          <el-input v-model="editBanner.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="发表时间:" :label-width="formLabelWidth">
          <span>{{editBanner.time}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="open"></el-button>
  </div>
</template>

<script>
  import axios from "axios"
  import {pathRouter} from "common/js/util"

  export default {
    data() {
      return {
        articles: [],
        loading: true,
        dialogFormVisible: false,
        editBanner: {
          title: '',
          desc: '',
          time: '',
          src:''
        },
        formLabelWidth: '80px',
      };
    },
    created() {
      this._getArticle();
    },
    methods: {
      //上传头像
      handleAvatarSuccess(res, file) {
        if (res.status === 200) {
          this.editBanner.img = res.url
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
      handleEdit(index, row) {

        this.oldimage = row.src;
        this._id = row._id;
      },
      updateForm() {
        let data = this.editBanner;
        data['oldimage'] = this.oldimage;
        data['_id'] = this._id;
        axios.post('/blog/articles/update/post', data)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: res.msg
              });
              this.dialogFormVisible = false;
              this._getArticle();
            } else {
              this.open('操作提示', '更新失败:' + `<span class="err-red">${res.msg}</span>`, {
                dangerouslyUseHTMLString: true
              });
            }
          })
          .catch((err) => {
            this.open('操作提示', '更新失败' + `<span class="err-red">${err}</span>`);
          })
      },
      open(title, msg) {
        this.$alert(msg, title, {
          dangerouslyUseHTMLString: true
        });
      },
      deleteBanner(index, row) {
        console.log(index, row);
      },
      _getArticle() {
        axios.get('/blog/admin/banner/get').then((res) => {
          res = res.data;
          if (res.status === 200) {
            this.articles = res.data;
            this.loading = false
          }
        }).catch((err) => {
          this.open(err + '服务器错误', '错误')
        })
      }
    }
  }
</script>

<style lang="less">
  .article-list {
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
  }
</style>
