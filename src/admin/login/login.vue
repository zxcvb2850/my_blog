<template>
  <div class="login fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>王小白后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" @keyup.enter.native="submitForm('loginForm')" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">{{tip}}</p>
      </section>
    </transition>
  </div>
</template>

<script>
  import axios from "axios"
  import {setCookie, getCookie, clearCookie} from "common/js/util"

  export default {
    data() {
      let validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        tip: '',       //登录提示信息
        rules: {
          username: [
            {validator: validateUser, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
        },
        showLogin: false,
      }
    },
    mounted() {
      this.showLogin = true;
    },
    created(){
      this.checkCookie();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/blog/admin/login', this.loginForm)
              .then((res) => {
                res = res.data;
                if (res.status === -1) {
                  return this.$message({message: res.msg, type: 'error'});
                } else {
                  console.log(this.loginForm.username);
                  setCookie('user', this.loginForm.username, 3600 * 1000);
                  setCookie('check', this.loginForm.password, 3600 * 1000);
                  this.$message({message: res.msg, type: 'success'});
                  setTimeout(() => {
                    this.$router.push('/admin');
                    this.$router.go(0);
                  }, 2000)
                }
              })
              .catch((err) => {
                console.log("用户获取失败");
                console.log(err)
              })
          } else {
            this.$message({
              message: '登录失败',
              type: 'warning'
            });
          }
        });
      },
      checkCookie: function () {
        let user = getCookie("user");
        let pwd = getCookie("check");
        if (user !== "") {
          this.$message({message: '欢迎再次登陆' + user, type: 'info'});
          axios.post('/blog/admin/login', {username: user, password: pwd})
            .then((res) => {
              res = res.data;
              if (res.status === -1) {
                return this.$message({message: res.msg, type: 'error'});
              } else {
                this.$message({message: res.msg, type: 'success'});
                setTimeout(() => {
                  this.$router.push('/admin');
                }, 2000)
              }
            })
            .catch((err) => {
              console.log("用户获取失败");
              console.log(err)
            })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #324057;

    .form_contianer {
      width: 320px;
      /*height: 210px;*/
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -105px;
      margin-left: -160px;
      padding: 25px;
      border-radius: 5px;
      text-align: center;
      background-color: #fff;
      &.form-fade-enter-active, &.form-fade-leave-active {
        transition: all 1s;
      }

      &.form-fade-enter, &.form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
      }
      .manage_tip {
        position: absolute;
        width: 100%;
        top: -100px;
        left: 0;
        p {
          font-size: 34px;
          color: #fff;
        }
      }
      .submit_btn {
        width: 100%;
        font-size: 16px;
      }
      .tip {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #ff0e0e;
      }
    }
  }
</style>
