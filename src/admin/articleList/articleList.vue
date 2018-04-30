<template>
  <div class="article-list">
    <el-table v-loading="loading"
              stripe
              border
              highlight-current-row
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="articles" style="width: 100%">
      <el-table-column prop="type" label="附属" width="60" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column label="发布时间" width="120">
        <template slot-scope="scope">
          <span>{{time(scope.row.time)}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" label="修改时间">
        <template slot-scope="scope">
          <span>{{time(scope.row.timeMod)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">显示</span>
          <span v-else style="color: #f00;">隐藏</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteArticle(scope.row._id, scope.row.img)">删除</el-button>
          <el-button size="mini" type="success" @click="detailArticle(scope.row)">查看</el-button>
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog center title="修改文章" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="editArt">
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="editArt.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述:" :label-width="formLabelWidth">
          <el-input v-model="editArt.desc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章类型:" :label-width="formLabelWidth">
          <el-select v-model="editArt.parent" clearable placeholder="请选择文章类型">
            <el-option label="文章" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章分类:" :label-width="formLabelWidth">
          <el-select v-model="editArt.type" clearable placeholder="请选择">
            <el-option v-for="item in optionType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否隐藏:" :label-width="formLabelWidth">
          <el-tooltip :content="'文章: ' + editArt.status" placement="top">
            <el-switch v-model="editArt.status" active-color="#13ce66" inactive-color="#D3DCE6" active-value="显示"
                       inactive-value="隐藏">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="发表时间:" :label-width="formLabelWidth">
          <span>{{editArt.time}}</span>
        </el-form-item>
        <el-form-item label="最后修改时间:" :label-width="formLabelWidth">
          <span>{{editArt.timeMod}}</span>
        </el-form-item>
        <el-form-item label="阅读次数:" :label-width="formLabelWidth">
          <span>{{editArt.read}} 次</span>
        </el-form-item>
        <el-form-item label="留言:" :label-width="formLabelWidth">
          <span>{{editArt.leavs}} 条</span>
        </el-form-item>
        <el-form-item label="来自:" :label-width="formLabelWidth">
          <el-input v-model="editArt.from" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动名称:" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="/blog/admin/image"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="editArt.img" :src="editArt.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="文章内容:" :label-width="formLabelWidth">
          <quill-editor v-model="editArt.content"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption">
          </quill-editor>
        </el-form-item>
        <el-form-item label="文章标签:" :label-width="formLabelWidth">
          <el-tag
            size="small"
            :key="tag"
            v-for="tag in editArt.label"
            type="danger"
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
            type="danger"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ New Tag</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="open"></el-button>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="pageSize"
      :page-size="rows"
      layout="sizes, prev, pager, next, jumper, total"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from "axios"
  import moment from "moment"
  import {pathRouter} from "common/js/util"

  export default {
    data() {
      return {
        page: 1,        //第几页
        pageSize: [5, 10, 20, 50],       //每页显示条数
        rows: 10,
        total: 0,       //数据总数
        articles: [],
        loading: true,
        dialogFormVisible: false,
        editArt: {
          title: '',
          type: '',
          from: '',
          time: '',
          timeMod: '',
          read: '',
          leavs: '',
          desc: '',
          img: '',
          content: '',
          parent: '',
          label: [],
          status: '显示'
        },
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
        inputVisible: false,
        inputValue: '',
        formLabelWidth: '100px',
        editorOption: {"a": "a"}
      };
    },
    created() {
      this._getArticle();
    },
    methods: {
      time(time){
        return moment(time).format('MM-DD H:mm')
      },
      modTime(time){
        return moment(time).format('MM-DD H:mm')
      },
      //标签
      handleClose(tag) {
        this.editArt.label.splice(this.editArt.label.indexOf(tag), 1);
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
          this.editArt.label.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      //上传图片
      handleAvatarSuccess(res, file) {
        if (res.status === 200) {
          this.editArt.img = res.url
          this.$message({
            message: res.msg,
            type: 'success'
          });
        } else {
          this.open("服务器错误", res.msg);
        }
      },
      //上传图片限制
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
      //查看的表单
      handleEdit(index, row) {
        console.log(row)
        this.dialogFormVisible = true;
        this.editArt.title = row.title;
        this.editArt.desc = row.desc;
        this.editArt.img = row.img;
        this.editArt.time = moment(row.time).format('YYYY-MM-DD H:mm:ss');
        this.editArt.timeMod = moment(row.timeMod).format('YYYY-MM-DD H:mm:ss');
        this.editArt.content = row.content;
        this.editArt.from = row.from;
        this.editArt.read = row.read;
        this.editArt.label = row.label;
        this.editArt.leavs = row.leavs.length;
        this.editArt.parent = row.parent + '';
        this.editArt.type = row.type + '';
        if (row.status === 1) {
          this.editArt.status = '显示';
        } else {
          this.editArt.status = '隐藏';
        }

        this.oldimage = row.img;
        this._id = row._id;
      },
      //查看
      detailArticle(row) {
        let parent = pathRouter(row);
        this.detail = `/index/${parent}/${row._id}`;
        window.open(`/index/${parent}/${row._id}`, "_blank");
      },
      //更新
      updateForm() {
        let data = this.editArt;
        if (data['status'] === '显示') {
          data['status'] = 1;
        } else {
          data['status'] = 0;
        }
        data['oldimage'] = this.oldimage;
        data['_id'] = this._id;
        console.log(data);
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
              this.open('操作提示', '更新失败:' + `<span class="err-red">${res.msg}</span>`, 'error');
            }
          })
          .catch((err) => {
            this.open('操作提示', '更新失败' + `<span class="err-red">${err}</span>`, 'error');
          })
      },
      //弹窗
      open(title, msg, status = 'info') {
        this.$alert(msg, title, {
          dangerouslyUseHTMLString: true,
          type: status
        });
      },
      //删除
      deleteArticle(id, img) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/blog/articles/delete/post', {id, img})
            .then((res) => {
              res = res.data;
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: res.msg
                });
                this._getArticle();
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

      //分页
      handleSizeChange(val) {
        this.loading = true;
        this.rows = val;
        this._getArticle();
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.page = val;
        this._getArticle();
      },
      _getArticle() {
        axios.get(`/blog/articles/get?all=1&page=${this.page}&rows=${this.rows}`).then((res) => {
          res = res.data;
          if (res.status === 200) {
            this.articles = res.data;
            this.total = res.count;
          } else {
            this.open('操作提示', res.msg);
          }
          this.loading = false
        }).catch((err) => {
          this.open(err + '服务器错误', '错误')
        })
      }
    }
  }
</script>

<style lang="less">
  @import "~common/style/index.less";

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

    .el-pagination {
      padding: 10px;
      position: fixed;
      bottom: 0;
      width: 82%;
      color: #000;
      background-color: #d0d0d0;
      .el-pager {
        li.active {
          .border-radius(3px);
          color: #FFF;
          background-color: @adminMainBackground;
        }
      }
      .btn-next, .btn-prev {
        .border-radius(3px);
        color: #FFF;
        background-color: @adminMainBackground;
        &.disabled {
          color: @adminMainBackground;
          background-color: #FFF;
        }
      }
      .el-pagination__total {
        position: absolute;
        right: 10px;
        color: #000;
      }
    }
  }
</style>
