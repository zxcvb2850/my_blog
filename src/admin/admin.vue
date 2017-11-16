<template>
  <div class="manage_page fillcontain" v-show="loginFlag">
    <el-row style="height: 100%;">
      <el-col :span="4" class="menu-list">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>
          <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i><span>用户列表</span></template>
            <el-menu-item index="1-1">用户列表</el-menu-item>
            <el-menu-item index="1-2">管理员列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>文章管理</template>
            <el-menu-item index="/admin/list">文章列表</el-menu-item>
            <el-menu-item index="/admin/addArticle">添加文章</el-menu-item>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20" class="header_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(item, index) in $route.meta" key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col style="width: 80px;">
          <el-dropdown>
            <span class="el-dropdown-link">
              <div class="avatar"><img src="../assets/logo.png" alt=""></div>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
      <el-col :span="20" class="content">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import axios from "axios"
  import VHeader from "components/header/header"
  import VFooter from "components/footer/footer"
  import {getCookie} from "common/js/util"
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    name: 'admin',
    data(){
      return {
        msg: '',
        loginStatus: false,
        loginFlag: false
      };
    },
    watch: {          //切换路由监听滚动条
      '$route': function (to, from) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    },
    mounted(){
      this._getCookie();
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      open(msg, title) {
        this.$alert(msg, title, {
          confirmButtonText: '确定'
        });
      },
      _getCookie(){
        let user = getCookie("user");
        let pwd = getCookie("check");
        if (user !== "") {
          axios.post('/blog/admin/login', {username: user, password: pwd})
            .then((res) => {
              res = res.data;
              if (res.status === -1) {
                this.$router.push('/admin/login');
              } else {
                this.loginFlag = true
              }
            })
            .catch((err) => {
              console.log("用户获取失败");
              console.log(err)
            })
        } else {
          this.$router.push('/admin/login');
          return;
        }
      }
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      }
    },
    components: {
      ElCol,
      VHeader,
      VFooter
    }
  }
</script>

<style lang="less">
  @import "~common/style/index.less";

  .manage_page {
    position: relative;
    width: 100%;
    height: 100%;
    .menu-list {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: -1px;
      background-color: #545c64;
      .el-menu {
        border: none;
      }
    }
    .el-menu-item {
      min-width: 0;
    }
    .header_container {
      position: absolute;
      overflow: hidden;
      right: 0;
      background-color: #eff2f7;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-left: 20px;
      height: @topHeight;
      .avatar {
        margin-right: @textHeight;
        display: inline-block;
        width: 50px;
        height: 50px;
        border: 1px solid orange;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .content {
      position: absolute;
      top: @topHeight;
      right: 0;
      overflow: hidden;
    }
  }
</style>
