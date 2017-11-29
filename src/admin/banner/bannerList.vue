<template>
  <div class="article-list">
    <el-table v-loading="loading"
              stripe
              border
              highlight-current-row
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" width="100"></el-table-column>
      <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column label="图片" width="320">
        <template slot-scope="scope">
          <div class="banner-src">
            <img :src="scope.row.src" :title="scope.row.title" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteBanner(scope.row._id, scope.row.src)">删 除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      };
    },
    created() {
      this._getBanner();
    },
    methods: {
      open(title, msg) {
        this.$alert(msg, title, {
          dangerouslyUseHTMLString: true
        });
      },
      deleteBanner(id, src) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/blog/banner/delete/post', {id, src})
            .then((res) => {
              res = res.data;
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this._getBanner();
              } else {
                this.$message({
                  type: 'err',
                  message: res.msg
                });
              }
            })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      _getBanner() {
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

    .banner-src {
      width: 300px;
      img {
        width: 100%;
      }
    }
  }
</style>
