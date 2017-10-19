import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import Message from 'components/message/message'
import Web from 'components/web/web'
import Search from 'components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
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
      name: 'WEB前端',
      path: '/web',
      component: Web
    },
    {
      name:'搜索',
      path:'/search',
      component:Search
    }
  ]
})
