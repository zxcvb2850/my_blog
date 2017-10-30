<template>
  <div class="detail">
    <div class="detail-left">
      <breadCrumb></breadCrumb>
      <div class="content">
        <h1 class="title">{{nowArticle.title}}</h1>
        <p class="time">{{nowArticle.time}} (<span class="from">{{nowArticle.from}}</span>) 阅读次数：{{nowArticle.read}}</p>
        <p class="content">{{content}}</p>
        <div class="label">
          <ol>
            <li class="label-item" v-for="label in nowArticle.label">
              <a href="javascript:;">{{label}}</a>
            </li>
          </ol>
        </div>
      </div>
      <div class="detail-comment">
        <el-form :model="message" :rules="rules2" ref="message" label-width="80px" class="demo-ruleForm"
                 label-position="left">
          <el-form-item label="用户名：" prop="user">
            <el-input type="text" v-model="message.user" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input type="email" v-model="message.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="留言：" prop="msg">
            <el-input v-model="message.msg" type="textarea" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('message')">发表</el-button>
            <el-button @click="resetForm('message')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="comment-content">
        <ul class="msg">
          <li class="item-msg">
            <div class="avatar"><img src="../../assets/logo.png" alt=""></div>
            <div class="center">
              <div class="info">
                <h4 class="username">xxx</h4>
                <p class="email">zxcvb2850@163.com</p>
              </div>
              <p class="content">xxxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx
              </p>
              <footer>
                <p>
                  <span>时间:</span>
                  <time>2017-10-10</time>
                </p>
                <p><a href="javascript:;">回复</a></p>
              </footer>
            </div>
          </li>
          <li class="item-msg">
            <div class="avatar"><img src="../../assets/logo.png" alt=""></div>
            <div class="center">
              <div class="info">
                <h4 class="username">xxx</h4>
                <p class="email">zxcvb2850@163.com</p>
              </div>
              <p class="content">xxxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx<br>xxxxxxxxx
              </p>
              <footer>
                <p>
                  <span>时间:</span>
                  <time>2017-10-10</time>
                </p>
                <p><a href="javascript:;">回复</a></p>
              </footer>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="detail-right">
      <div class="hot">
        <h3 class="title">热门文章</h3>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import breadCrumb from 'base/breadcrumb/breadcrumb.vue'

  export default {
    data(){
      let checkMsg = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('留言内容不能为空'));
        }
      };
      let validateUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名内容不能为空'));
        }
      };
      let validateEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        if (!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value)) {
          return callback(new Error('邮箱--------不能为空'));
        }
      };
      return {
        nowArticle: [],
        content: '',

        //评论所需
        textarea: '',
        message: {
          user: '',
          email: '',
          msg: ''
        },
        rules2: {
          user: [
            {validator: validateUser, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          msg: [
            {validator: checkMsg, trigger: 'blur'}
          ]
        }
      }
    },
    created(){
      setTimeout(() => {
        this.wrapLine();
      }, 200)
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid)
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
      },
      wrapLine(){
        setTimeout(() => {
          let content = this.nowArticle.content;
          if (content) {
            this.content = content.replace(/[\n]/g, "<br/>");
          }
        }, 200)
      },
      _getArticle(){
        this.articleId = this.$route.params.id;
        axios.get(`/api/article/detail?id=${this.articleId}`)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              this.nowArticle = res.data[0];
            }
          })
          .catch((err) => {
            console.log(err);
            console.log("文章获取失败");
          })
      }
    },
    components: {
      breadCrumb
    },
    activated(){
      this._getArticle();
    },
    deactivated(){
      this._getArticle();
    }
  }
</script>

<style lang="less" scoped="">
  @import "~common/style/index.less";

  .detail {
    display: flex;
    .detail-left {
      flex: 1;
      .title {
        text-align: center;
      }
      .time {
        padding: 0;
        font-size: @smallFontSize;
        color: @infoColor;
        text-align: center;
        .from {
          font-size: @smallerFontSize;
        }
      }
      .content {
        padding: 0 30px;
        line-height: @titleFontSize;
        font-size: @fontSize;
        text-align: left;
        overflow: hidden;
      }
      .label {
        padding: 0 20px;
        line-height: @textHeight;
        font-size: @smallFontSize;
        text-indent: 0;
        overflow: hidden;
        .border-box;
        .read, .leaving {
          display: inline-block;
          .transition(all, 0.35s);
          &:hover {
            -webkit-transform: scale(1.1, 1.1);
            -moz-transform: scale(1.1, 1.1);
            -ms-transform: scale(1.1, 1.1);
            -o-transform: scale(1.1, 1.1);
            transform: scale(1.1, 1.1);
          }
        }
        ol {
          list-style-type: none;
          float: right;
        }
        .label-item {
          display: inline-block;
          margin: 2px;
          padding: 0 6px;
          background-color: @labelBackground;
          .transition(all, 0.35s);
          &:hover {
            transform: rotate(360deg);
            background-color: @labelHoverBackground;
          }
          a {
            display: block;
            text-align: center;
            color: #fff;
          }
        }
      }
      .detail-comment {
        margin: 0 50px;
        padding-bottom: 20px;
        .border-1px(@infoColor);
      }
      .comment-content {
        .item-msg {
          list-style-type: none;
          margin: 10px 0;
          display: flex;
          .border-1px(@infoColor);
          .avatar {
            flex: @avatarWidth 0 0;
            img {
              width: 100%;
            }
          }
          .center {
            flex: 1;
            padding-left: 20px;
            .info {
              .username, .email {
                display: inline-block;
              }
              .username {
                padding: 0;
                margin: 0;
                font-size: @titleFontSize;
              }
              .email {
                margin-left: 20px;
                font-size: @smallFontSize;
              }
            }
            .content {
              margin: 0;
              padding: 6px;
              font-size: @fontSize;
            }
            footer {
              font-size: @smallFontSize;
              p {
                display: inline-block;
                color: @infoColor;
              }
              a {
                margin-left: 20px;
                &:hover {
                  text-decoration: underline;
                  color: @hotColor;
                }
              }
            }
          }
        }
      }
    }
    .detail-right {
      flex: 0 0 300px;
      align-self: flex-start;
      margin-top: 80px;
      padding: 0 20px;
      overflow: hidden;
    }
  }

  @media (max-width: 992px) {
    .detail-left {
      .title {
        text-align: center;
      }
    }

    .detail-right {
      display: none;
    }
  }
</style>
