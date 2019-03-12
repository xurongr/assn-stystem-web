import Vue from 'vue'
import Router from 'vue-router'

import login from "@/views/login";  //登录页

import index from "@/views/system";  //后台管理首页
import userIndex from "@/views/system/userManage/index";  //用户管理
import addUser from "@/views/system/userManage/addUser";  //添加用户
import userInfomation from "@/views/system/userManage/userInfomation";   //查看、编辑用户信息

import assnManage from "@/views/system/assnManage";    //我的社团
import addAssn from "@/views/system/assnManage/addAssn";   //创建社团
import infoManage from "@/views/system/assnManage/infoManage";    //查看、编辑社团
import announcementManage from "@/views/system/assnManage/announcementManage";   //公告
import addAnnoucement from "@/views/system/assnManage/addAnnoucement";   //发布公告

import memberManage from "@/views/system/memberManage/index";   //社团成员列表页

// 前端
import webIndex from "@/views/web/index";
import homePage from "@/views/web/homePage";   //首页
import assnView from "@/views/web/assnView";   //社团风采


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录页',
      }
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
          component: addUser,
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
          path: '/index/assnManage/userInfomation',
          title: '查看用户信息',
          name: 'userInfomation',
          component: userInfomation,
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
            title: '公告列表',
          }
        },
        {
          path: '/index/announcementManage/addAnnoucement',
          name: 'addAnnoucement',
          component: addAnnoucement,
          meta: {
            title: '发布公告',
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
    {
      path:'/index/web',
      name: 'webIndex',
      component: webIndex,
      children: [
        {
          path: '/index/web',
          name: 'homePage',
          component: homePage,
        },
        {
          path: '/index/web/homePage',
          name: 'homePage',
          component: homePage,
          meta: {
            title: '首页',
          }
        },
        {
          path: '/index/web/assnView',
          name: 'assnView',
          component: assnView,
          meta: {
            title: '社团风采',
          }
        }
      ]
    },
  ]
})
