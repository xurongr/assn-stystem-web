import Vue from 'vue'
import Router from 'vue-router'

import manageIndex from "@/views/backstageManage/index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'manageIndex',
      component:manageIndex
    },
    {
      path: '/manageIndex',
      name: 'manageIndex',
      component:manageIndex,
      meta: {
        title: '后台管理首页'
      }
    }
  ]
})
