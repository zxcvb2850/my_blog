<template>
  <div class="detail">
    <div class="detail-left">
      <breadCrumb></breadCrumb>
      <div class="content">
        <h1 class="title">{{nowArticle.title}}</h1>
        <p class="time">{{nowArticle.time}} (<span class="from">{{nowArticle.from}}</span>) 阅读次数：{{nowArticle.read}}</p>
        <p class="content" v-html="content"></p>
        <div class="label">
          <ol>
            <li class="label-item" v-for="label in nowArticle.label">
              <a href="javascript:;">{{label}}</a>
            </li>
          </ol>
        </div>
      </div>
      <div class="detail-comment" v-show="this.nowArticle">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="*用户名" prop="user">
            <el-input type="text" v-model="ruleForm2.user" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="*邮箱" prop="email">
            <el-input type="email" v-model="ruleForm2.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="*留言内容" prop="center">
            <el-input v-model="ruleForm2.center"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="comment-content" v-if="this.leaving.length>0">
        <ul class="msg">
          <li class="item-msg" v-for="leav in leaving">
            <div class="avatar"><img :src="'../../assets/' + leav.avatar" alt=""></div>
            <div class="center">
              <div class="info">
                <h4 class="username">{{leav.name}}</h4>
                <p class="email">{{leav.email}}</p>
              </div>
              <p class="content">{{leav.content}}</p>
              <footer>
                <p>
                  <span>时间:</span>
                  <time>{{leav.time}}</time>
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
    <el-button type="text" @click="open"></el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import breadCrumb from 'base/breadcrumb/breadcrumb.vue'

  export default {
    data(){
      var checkUser = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else {
          if (!/^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g.test(value)) {
            callback(new Error('邮箱格式不正确'))
          } else {
            callback();
          }
        }
      };
      var checkCenter = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入留言内容'));
        } else {
          callback();
        }
      };

      return {
        nowArticle: [],
        leaving: [],
        content: '',
        msg: '操作失误',
        title: '操作提示',

        //评论所需
        ruleForm2: {
          user: '',
          email: '',
          center: ''
        },
        rules2: {
          user: [
            {validator: checkUser, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          center: [
            {validator: checkCenter, trigger: 'blur'}
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
          if (valid) {
            let post = {
              id: this.articleId,
              name: this.ruleForm2.user,
              email: this.ruleForm2.email,
              center: this.ruleForm2.center
            }
            axios.post('/api/article/leavs', post)
              .then((res) => {
                if (res.data.status === -1) {
                  this.msg = res.data.msg
                  this.open(res.msg);
                }
                this._getLeavs();
              })
              .catch((err) => {
                this.msg = res.msg;
                this.open();
                console.log(err);
                console.log("获取失败")
              })
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
      open() {
        this.$alert(this.msg, this.title, {
          confirmButtonText: '确定'
        });
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
            this.msg = res.msg;
            this.open();
            console.log(err);
            console.log("文章获取失败");
          })
      },
      _getLeavs(){
        axios.get(`/api/article/leavs/get?id=${this.articleId}`)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              this.leaving = res.data;
            } else {
              this.msg = res.msg;
              this.open();
            }
          })
          .catch((err) => {
            this.msg = res.msg;
            this.open();
            console.log(err)
            console.log("获取评论失败")
          })
      }
    },
    components: {
      breadCrumb
    },
    activated(){
      this._getArticle();
      this._getLeavs();
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
        .border-1px(@divisionLine);
      }
      .comment-content {
        .item-msg {
          list-style-type: none;
          margin: 10px 0;
          display: flex;
          .border-1px(@divisionLine);
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
