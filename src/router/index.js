import Vue from 'vue'
import Router from 'vue-router'

import index from "@/views/system";
import userIndex from "@/views/system/userManage/index";
import addUser from "@/views/system/userManage/addUser";

import assnManage from "@/views/system/assnManage";
import addAssn from "@/views/system/assnManage/addAssn";
import infoManage from "@/views/system/assnManage/infoManage";
import announcementManage from "@/views/system/assnManage/announcementManage";

import memberManage from "@/views/system/memberManage/index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/index',
      name: 'index',
      component:index,
      children: [
        {
          path:"/index",
          name:"userIndex",
          component: userIndex,
        },
        {
          path: '/index/userIndex',
          title: '用户管理',
          name: 'userIndex',
          component:userIndex,
        },
        {
          path: '/index/userIndex/addUser',
          title: '添加用户',
          name: 'addUser',
          component:addUser,
        },
        {
          path: '/index/assnManage',
          name: 'assnManage',
          component: assnManage,
          meta: {
            title: '我的社团',
          },
        },
        {
          path: '/index/assnManage/addAssn',
          name: 'addAssn',
          component: addAssn,
          meta: {
            title: '创建社团',
          },
        },
        {
          path: '/index/assnManage/infoManage',
          name: 'infoManage',
          component: infoManage,
          meta: {
            title: '编辑社团信息',
          },
        },
        {
          path: '/index/announcementManage',
          name: 'announcementManage',
          component: announcementManage,
          meta: {
            title: '社团公告列表',
          }
        },
        {
          path: '/index/memberManage',
          name: 'memberManage',
          component: memberManage,
          meta: {
            title: '社团成员管理',
          }
        }
      ]
    },
  ]
})
