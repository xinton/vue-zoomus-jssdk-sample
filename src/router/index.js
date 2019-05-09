import Vue from 'vue'
import Router from 'vue-router'
const Join = () => import('@/components/Join')
const Meeting = () => import('@/components/Meeting')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'join',
      component: Join
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: Meeting
    }
  ]
})
