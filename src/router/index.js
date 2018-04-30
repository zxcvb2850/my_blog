import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import Home from 'components/index/home'
import Message from 'components/message/message'
import Web from 'components/list/web/web'
import Node from 'components/list/node/node'
import VueArt from 'components/list/vue/vue'
import Search from 'components/search/search'
import Articles from 'components/articles/articles'

//后端页面
import axios from 'axios'
import {getCookie} from 'common/js/util'
import Admin from 'admin/admin'
import Login from 'admin/login/login'
import adminIndex from 'admin/index'
import articleList from 'admin/articleList/articleList'
import articleAdd from 'admin/articleList/articleAdd'
import bannerList from 'admin/banner/bannerList'
import bannerAdd from 'admin/banner/bannerAdd'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true, // 当用户点击后退按钮时，借助 HTML5 history 中的 popstate 事件对应的 state 来重置页面的滚动位置。注意，当 <router-view> 设定了相应的场景切换效果时，这个可能不会得到预想的效果。
  linkActiveClass: 'active',
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      //name: '首页',
      path: '/index',
      component: Index,
      hidden: true,
      children: [
        {path: '', component: Home, meta: ['首页']},
        {name: 'web', path: 'web', component: Web, meta: ['web']},
        {name: 'node', path: 'node', component: Node, meta: ['node']},
        {name: 'vue', path: 'vue', component: VueArt, meta: ['vue']},
        {name: 'web文章详情', path: 'web/:id', component: Articles, meta: ['文章详情']},
        {name: 'node文章详情', path: 'node/:id', component: Articles, meta: {auth: false, scrollToTop: true}},
        {name: 'vue文章详情', path: 'vue/:id', component: Articles, meta: {auth: false, scrollToTop: true}}
      ]
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {path: '', redirect: '/admin/index'},
        {path: 'index', component: adminIndex},
        {name: '文章列表', path: 'listArticle', component: articleList, meta: ['文章列表']},
        {name: '添加文章', path: 'addArticle', component: articleAdd, meta: ['添加文章']},
        {name: 'banner列表', path: 'listBanner', component: bannerList, meta: ['banner列表']},
        {name: '添加banner', path: 'addBanner', component: bannerAdd, meta: ['添加banner']},
      ]
    },
    {
      name: '登录页面',
      path: '/admin/login',
      component: Login
    }
  ]
})

/*后端页面需要登录的权限*/
let isLogin = ['/admin', '/admin/index', '/admin/listArticle', '/admin/addArticle', '/admin/listBanner', '/admin/addBanner']

router.beforeEach((to, from, next) => {
  if (to.path === '/admin/login') {
    next();
  } else {
    for (let i = 0; i < isLogin.length; i++) {
      if (to.path === isLogin[i]) {
        let user = getCookie("user");
        let check = getCookie("check");
        if (!user) {
          next({path: '/admin/login'})
        } else {
          axios.post('/blog/admin/login', {username: user, password: check})
            .then((res) => {
              res = res.data;
              if (res.status === 200) {
                next();
              } else {
                next({name: '登录页面'})
              }
            })
            .catch((err) => {
              console.log(err);
              next({path: '/admin/login'})
            })
        }
      } else {
        next();
      }
    }
  }
})

/*export default new Router({
 mode: 'history',
 saveScrollPosition: true, // 当用户点击后退按钮时，借助 HTML5 history 中的 popstate 事件对应的 state 来重置页面的滚动位置。注意，当 <router-view> 设定了相应的场景切换效果时，这个可能不会得到预想的效果。
 linkActiveClass: 'active',
 routes: [
 {
 path: '',
 redirect: '/index'
 },
 {
 //name: '首页',
 path: '/index',
 component: Index,
 hidden: true,
 children: [
 {path: '', component: Home, meta: ['首页']},
 {name: 'web', path: 'web', component: Web, meta: ['web']},
 {name: 'node', path: 'node', component: Node, meta: ['node']},
 {name: 'vue', path: 'vue', component: VueArt, meta: ['vue']},
 {name: 'web文章详情', path: 'web/:id', component: Articles, meta: ['文章详情']},
 {name: 'node文章详情', path: 'node/:id', component: Articles, meta: {auth: false, scrollToTop: true}},
 {name: 'vue文章详情', path: 'vue/:id', component: Articles, meta: {auth: false, scrollToTop: true}}
 ]
 },
 {
 path: '/admin',
 component: Admin,
 beforeEach: (to, from, next) => {
 console.log(to.path);
 if (to.path === '/admin/login') {
 next();
 } else {
 let user = getCookie("user");
 let check = getCookie("check");
 console.log(user)
 if (!user) {
 next({path: '/admin/login'})
 } else {
 axios.post('/blog/admin/login', {username: user, password: check})
 .then((res) => {
 res = res.data;
 if (res.status === 200) {
 console.log(1)
 next();
 } else {
 next({name: '登录页面'})
 }
 })
 .catch((err) => {
 console.log(err);
 next({path: '/admin/login'})
 })
 }
 }
 },
 children: [
 {path: '', redirect: '/admin/index'},
 {path: 'index', component: adminIndex},
 {name: '文章列表', path: 'listArticle', component: articleList, meta: ['文章列表']},
 {name: '添加文章', path: 'addArticle', component: articleAdd, meta: ['添加文章']},
 {name: 'banner列表', path: 'listBanner', component: bannerList, meta: ['banner列表']},
 {name: '添加banner', path: 'addBanner', component: bannerAdd, meta: ['添加banner']},
 ]
 },
 {
 name: '登录页面',
 path: '/admin/login',
 component: Login
 }
 ]
 })*/

export default router;
