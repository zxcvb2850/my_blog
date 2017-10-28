import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index/index'
import Message from 'components/message/message'
import Web from 'components/web/index'
import Search from 'components/search/search'
import Articles from 'components/articles/articles'

Vue.use(Router)

export default new Router({
  mode: 'history',
  saveScrollPosition: true, // 当用户点击后退按钮时，借助 HTML5 history 中的 popstate 事件对应的 state 来重置页面的滚动位置。注意，当 <router-view> 设定了相应的场景切换效果时，这个可能不会得到预想的效果。
  linkActiveClass: 'active',
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
      component: Web,
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
    }
  ]
})
