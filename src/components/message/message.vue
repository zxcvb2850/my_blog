<template>
  <article class="art-message">
    <div class="message-wrapper">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="demo-ruleForm"
               label-position="left">
        <el-form-item label="用户名：" prop="pass">
          <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="checkPass">
          <el-input type="email" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="留言：" prop="age">
          <el-input v-model.number="ruleForm2.age" type="textarea" :rows="10"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">发表</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list">
      <h2>留言：</h2>
      <ul>
        <li class="list-item">
          <div class="img">
            <img src="../../assets/logo.png" alt="">
          </div>
          <div class="info">
            <h3 class="username">xxx</h3>
            <p class="content"></p>
            <time>12:00:00</time>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
  export default {
    data(){
      let checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('留言内容不能为空'));
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱不能为空'));
        } else {
          callback();
        }
      };
      return {
        textarea: '',
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ],
          age: [
            {validator: checkAge, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "~common/style/index.less";

  .art-message {
    width: 100%;
    .message-wrapper {
      margin: 0 auto;
      width: 80%;
    }
  }

  @media (max-width: 992px) {
    .art-message {
      .message-wrapper {
        width: 90%;
      }
    }

  }
</style>
