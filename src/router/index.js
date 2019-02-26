import Vue from 'vue'
import Router from 'vue-router'

import manageIndex from "@/views/backstageManage";
import userManage from "@/views/backstageManage/userManage";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'manageIndex',
    },
    {
      path: '/manageIndex',
      name: 'manageIndex',
      component:manageIndex,
      children: [
        {
          path:"",
          title:"用户管理",
          name:"userManage",
          component:userManage
        },
        {
          path: 'userManage',
          title: '用户管理',
          name: 'userManage',
          component:userManage,
        }
      ]
    }
  ]
})
