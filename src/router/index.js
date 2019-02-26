import Vue from 'vue'
import Router from 'vue-router'

import manageIndex from "@/views/backstageManage/index";
import userManage from "@/views/backstageManage/userManage/index";

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
      // meta: {
      //   title: '后台管理首页'
      // },
      children: [
        {
          path: '/userManage',
          name:'userManage',
          component: userManage
        },
      ]
    }
  ]
})
