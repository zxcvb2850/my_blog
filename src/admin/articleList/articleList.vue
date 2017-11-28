<template>
  <div class="article-list">
    <el-table v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)" :data="articles" style="width: 100%">
      <el-table-column prop="type" label="附属" width="80" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" width="180"></el-table-column>
      <el-table-column prop="desc" label="描述" show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="状态" width="50"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="deleteArticle">删 除</el-button>
          <el-button size="mini" @click="detailArticle(scope.row)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog center title="修改文章" :visible.sync="dialogFormVisible" width="80%">
      <el-form :model="editArt">
        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="editArt.title" auto-complete="off"></el-input>
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
          <el-tooltip :content="'文章: ' + editArt.value5" placement="top">
            <el-switch v-model="editArt.value5" active-color="#13ce66" inactive-color="#D3DCE6" active-value="显示"
                       inactive-value="隐藏">
            </el-switch>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="发表时间:" :label-width="formLabelWidth">
          <span>{{editArt.time}}</span>
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
        <el-form-item label="活动区域:" :label-width="formLabelWidth">
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
  </div>
</template>

<script>
  import axios from "axios"
  import {pathRouter} from "common/js/util"

  export default {
    data(){
      return {
        articles: [],
        loading: true,
        dialogFormVisible: false,
        form: {
          name: '',
          type: '',
          from: '',
          desc: ''
        },
        editArt: {
          name: '',
          type: '',
          from: '',
          read: '',
          leavs: '',
          desc: '',
          img: '',
          content: '',
          parent: '',
          label: [],
          value5: '显示'
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
        formLabelWidth: '80px',
        editorOption: {"a": "a"},
        detail: ''        //跳转地址
      };
    },
    created(){
      this._getArticle();
    },
    methods: {
      //标签
      handleClose(tag) {
        console.log(tag);
        this.editArt.dynamicTags.splice(this.editArt.dynamicTags.indexOf(tag), 1);
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
          this.editArt.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },

      //上传头像
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
        this.dialogFormVisible = true;
        this.editArt.title = row.title;
        this.editArt.desc = row.desc;
        this.editArt.img = row.img;
        this.editArt.time = row.time;
        this.editArt.content = row.content;
        this.editArt.from = row.from;
        this.editArt.read = row.read;
        this.editArt.label = row.label;
        this.editArt.leavs = row.leavs.length;
        this.editArt.parent = row.parent + '';
        this.editArt.type = row.type + '';

        this.oldimage = row.img;
        this._id = row._id;
      },
      detailArticle(row){
        let parent = pathRouter(row);
        this.detail = `/index/${parent}/${row._id}`;
        window.open(`/index/${parent}/${row._id}`, "_blank");
      },
      updateForm(){
        let data = this.editArt;
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
      deleteArticle(index, row){
        console.log(index, row);
      },
      _getArticle(){
        axios.get('/blog/articles/get').then((res) => {
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
