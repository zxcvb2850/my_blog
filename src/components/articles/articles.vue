<template>
  <div class="detail">
    <div class="detail-left">
      <breadCrumb></breadCrumb>
      <div class="content">
        <h1 class="title">{{nowArticle.title}}</h1>
        <div class="time">
          <p>{{nowArticle.time}}</p>
          <p>(<span class="from">{{nowArticle.from}}</span>) </p>
          <p>阅读次数：{{nowArticle.read}}</p>
        </div>
        <div class="status">
          <p class="status-no" v-if="nowArticle.status === 0"><i class="el-icon-remove-outline"></i>此文章已被隐藏 </p>
        </div>
        <div class="content-text" v-html="nowArticle.content"></div>
        <div class="label">
          <ol>
            <li class="label-item" v-for="label in nowArticle.label">
              <a href="javascript:;">
                <el-tag type="danger" size="medium">{{label}}</el-tag>
              </a>
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
            <el-input v-model="ruleForm2.center" @keyup.enter.native="submitForm('ruleForm2')"></el-input>
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
      <hot-articles @detailClick="detailClick"></hot-articles>
    </div>
    <el-button type="text" @click="open"></el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import breadCrumb from 'base/breadcrumb/breadcrumb'
  import hotArticles from 'base/hotArticles/hotArticles'

  export default {
    data() {
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
        hotArticle: [],
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
    created() {
      setTimeout(() => {
        this._getHotArticle();
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
            axios.post('/blog/article/leavs', post)
              .then((res) => {
                if (res.data.status === -1) {
                  this.msg = res.data.msg
                  this.open(res.msg);
                } else {
                  this.resetForm('ruleForm2');
                  this._getLeavs();
                }
              })
              .catch((err) => {
                console.log(err);
                console.log("获取失败")
              })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open() {
        this.$alert(this.msg, this.title, {
          confirmButtonText: '确定'
        });
      },
      detailClick() {
        this._getArticle();
        this._getLeavs();
      },
      //获取文章详情
      _getArticle() {
        this.articleId = this.$route.params.id;
        axios.get(`/blog/article/detail?id=${this.articleId}`)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              res.data.time = moment(res.data.time).format('YYYY-MM-DD H:mm:ss');
              this.nowArticle = res.data;
            }
          })
          .catch((err) => {
            this.msg = res.msg;
            this.open();
            console.log(err);
            console.log("文章获取失败");
          })
      },
      //获取留言
      _getLeavs() {
        axios.get(`/blog/article/leavs/get?id=${this.articleId}`)
          .then((res) => {
            res = res.data;
            if (res.status === 200) {
              for (let i = 0; i < res.data.length; i++) {
                res.data[i].time = moment(res.data[i].time).format("lll");
              }
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
      },
      _getHotArticle() {
        axios.get('/blog/articles/hot/get')
          .then((res) => {
            res = res.data;
            this.hotArticle = res.data;
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    components: {
      breadCrumb,
      hotArticles
    },
    activated() {
      this._getArticle();
      this._getLeavs();
      this.resetForm('ruleForm2');
    }
  }
</script>

<style lang="less">
  @import "~common/style/index.less";

  .detail {
    display: flex;
    .detail-left {
      flex: 1;
      display: block;
      .content {
        .title {
          text-align: center;
          line-height: 36px;
        }
        .time {
          padding: 0;
          font-size: @smallFontSize;
          color: @infoColor;
          text-align: center;
          p {
            display: inline-block;
            &:nth-child(2n) {
              margin: 0 10px;
            }
          }
          .from {
            font-size: @smallerFontSize;
          }
        }
        .status {
          text-align: center;
          color: #f00;
          .el-icon-remove-outline {
            font-size: 30px;
            vertical-align: middle;
            transform-origin: center center;
            .transition(all, .4s);
            &:hover {
              -webkit-transform: rotate(360deg);
              -moz-transform: rotate(360deg);
              -ms-transform: rotate(360deg);
              -o-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        }
        .content-text {
          padding: 0 30px;
          line-height: @titleFontSize;
          font-size: @fontSize;
          text-align: left;
          overflow: hidden;
          h1, h2, h3, h4, h5, h6 {
            line-height: 26px;
          }
          a {
            display: inline-block;
          }
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
            .transition(all, 0.35s);
            &:hover {
              transform: rotate(360deg);
            }
          }
        }
      }
      .detail-comment {
        margin: 0 50px;
        padding-bottom: 20px;
        .border-1px(@divisionLine);
      }
      .comment-content {
        ul {
          padding: 0;
        }
        .item-msg {
          list-style-type: none;
          margin: 10px 0;
          padding: 0;
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
                color: @dateBackground;
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
      .detail-comment {
        margin: 0 10px !important;
      }
    }

    .detail-right {
      display: none;
    }
  }
</style>
