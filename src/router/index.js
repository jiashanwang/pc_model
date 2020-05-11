import Vue from 'vue'
import Router from 'vue-router'
/* 加载根组件 */
const Index = r => require.ensure([], () => r(require('@/views/index')), 'index')
const Login = r => require.ensure([], () => r(require('@/views/login')), 'login')
const Forget = r => require.ensure([], () => r(require('@/views/forget')), 'forget')
const PersonalCenter = r => require.ensure([], () => r(require('@/views/personalCenter')), 'personalCenter')
// 加载其他组件(子组件)
const routeModules = require.context('.', false, /\.js$/)
let childrenRoutes = []
routeModules.keys().forEach(key => {
  if (key === './index.js') {
    return
  }
  childrenRoutes = childrenRoutes.concat(routeModules(key).default)
})
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/forget',
      name: 'Forget',
      component:Forget
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component:PersonalCenter
    },
    {
      path: '/',
      name: 'Index',
      component:Index,
      children:childrenRoutes
    },
  ]
})
