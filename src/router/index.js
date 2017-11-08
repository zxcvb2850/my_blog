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
import Admin from 'admin/admin'
import Login from 'admin/login/login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  saveScrollPosition: true, // 当用户点击后退按钮时，借助 HTML5 history 中的 popstate 事件对应的 state 来重置页面的滚动位置。注意，当 <router-view> 设定了相应的场景切换效果时，这个可能不会得到预想的效果。
  linkActiveClass: 'active',
  routes: [
    {
      path: '',
      redirect: '/index'
    },
    {
      name: '首页',
      path: '/index',
      component: Index,
      hidden: true,
      children: [
        {path: '', component: Home, meta: {auth: false}},
        {name: 'web', path: 'web', component: Web, meta: {auth: false}},
        {name: 'node', path: 'node', component: Node, meta: {auth: false}},
        {name: 'vue', path: 'vue', component: VueArt, meta: {auth: false}},
        {name: '文章详情', path: 'web/:id', component: Articles, meta: {auth: false, scrollToTop: true}},
        {name: '文章详情', path: 'node/:id', component: Articles, meta: {auth: false, scrollToTop: true}},
        {name: '文章详情', path: 'vue/:id', component: Articles, meta: {auth: false, scrollToTop: true}}
      ]
    },
    {
      name: '后端页面', path: '/admin', component: Admin,
      children: [
        {name: '登录页面', path: 'login', component: Login, meta: {auth: false}},
      ]
    }
    /*{
     name: '首页',
     path: '/index',
     component: Index
     },
     {
     name: '留言板',
     path: '/message',
     component: Message
     },
     {
     name: 'web',
     path: '/web',
     component: Web,
     },
     {
     name: 'node',
     path: '/node',
     component: Node,
     },
     {
     name: 'vue',
     path: '/vue',
     component: VueArt,
     },
     {
     name: '搜索',
     path: '/search',
     component: Search
     },
     {
     name: '文章详情',
     path: '/web/:id',
     component: Articles
     },
     {
     name: '文章详情',
     path: '/node/:id',
     component: Articles
     },
     {
     name: '文章详情',
     path: '/vue/:id',
     component: Articles
     },
     {
     name: '后端页面',
     path: '/admin',
     component: Admin
     }*/
  ]
})
