<template>
  <div id="admin">
    后端页面
    <router-view></router-view>
    <el-button type="text" @click="open"></el-button>
  </div>
</template>

<script>
  import axios from "axios"
  import VHeader from "components/header/header"
  import VFooter from "components/footer/footer"

  export default {
    name: 'admin',
    data(){
      return {
        msg: ''
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
      open(msg, title) {
        this.$alert(msg, title, {
          confirmButtonText: '确定'
        });
      },
      _getCookie(){
        console.log(document.cookie.user);
        let cookie = document.cookie;
        if (!cookie) {
          this.$router.push('/admin/login');
          return;
        }
        /*axios.get('/api/admin/cookie')
         .then((res) => {
         res = res.data;
         if (res.status === -1) {
         this.$router.push('/admin/login');
         return;
         }
         })
         .catch((err) => {
         this.open(err + "服务器错误,请联系管理员，谢谢", "服务器错误");
         return;
         })*/
      }
    },
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style lang="less">
  html {
    margin: 0;
    padding: 0;
    background-color: #f6f6f6;
  }

  a {
    text-decoration: none;
    color: #2c3e50;
  }

  #app {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
