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
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="small">查看</el-button>
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改文章" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择文章类型">
            <el-option label="web前端" value="1"></el-option>
            <el-option label="node" value="2"></el-option>
            <el-option label="vue" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发表时间" :label-width="formLabelWidth">
          <span>11212</span>
        </el-form-item>
        <el-form-item label="来自" :label-width="formLabelWidth">
          <el-input v-model="form.from" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="商铺图片" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img src="../../assets/logo.png" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="text" @click="open"></el-button>
  </div>
</template>

<script>
  import axios from "axios"

  export default {
    data(){
      return {
        articles: [],
        loading: true,
        dialogFormVisible: false,
        imageUrl: '',
        form: {
          name: '',
          type: '',
          from: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    created(){
      this._getArticle();
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
      },
      open(msg, title) {
        this.$alert(msg, title, {
          confirmButtonText: '确定'
        });
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

<style lang="less" scoped>
</style>
