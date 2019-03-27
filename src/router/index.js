import Vue from 'vue'
import Router from 'vue-router'

import login from "@/views/login";  //登录页

import index from "@/views/system";                                      //后台管理首页
import userIndex from "@/views/system/userManage/index";                 //用户管理
import addUser from "@/views/system/userManage/addUser";                 //添加用户
import userInfomation from "@/views/system/userManage/userInfomation";   //查看、编辑用户信息

import assnManage from "@/views/system/assnManage";               //我的社团
import addAssn from "@/views/system/assnManage/addAssn";          //创建社团
import infoManage from "@/views/system/assnManage/infoManage";    //查看、编辑社团

import announcementManage from "@/views/system/assnManage/announcementManage";   //公告
import addAnnoucement from "@/views/system/assnManage/addAnnoucement";           //发布公告
import editAnnounce from "@/views/system/assnManage/editAnnounce";               //查看、编辑公告信息

import memberManage from "@/views/system/memberManage/index";          //社团成员列表页
import addMenber from "@/views/system/memberManage/addMenber";         //添加社团成员
import editMember from "@/views/system/memberManage/editMember"        //查看、修改社团成员信息

import activityManage from "@/views/system/activityManage/index";       //社团活动列表页
import addActivity from "@/views/system/activityManage/addActivity";    //创建社团活动
import editActivity from "@/views/system/activityManage/editActivity";  //编辑社团活动

import departManage from "@/views/system/departManage/index";            // 部门管理列表
import addDepart from "@/views/system/departManage/addDepart";           // 添加部门

import identityChange from "@/views/system/identityChange";              // 更改身份

// 前端
import webIndex from "@/views/web/index";
import homePage from "@/views/web/homePage";       //首页
import assnView from "@/views/web/assnView";       //社团风采
import recruitNew from "@/views/web/recruitNew";   //社团招新
import applyTable from "@/views/web/applyTable";   //申请表格
import morePage from "@/views/web/morePage";       //更多


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
          path: '/index/announceManage/editAnnounce',
          name: 'editAnnounce',
          component: editAnnounce,
          meta: {
            title: '公告信息',
          }
        },
        {
          path: '/index/memberManage',
          name: 'memberManage',
          component: memberManage,
          meta: {
            title: '社团成员管理',
          }
        },
        {
          path: '/index/memberManage/addMenber',
          name: 'addMenber',
          component: addMenber,
          meta: {
            title: '添加社团成员',
          }
        },
        {
          path: '/index/memberManage/editMember',
          name: 'editMember',
          component: editMember,
          meta: {
            title: '社团成员信息',
          }
        },
        {
          path: '/index/activityManage',
          name: 'activityManage',
          component: activityManage,
          meta: {
            title: '社团活动列表',
          }
        },
        {
          path: '/index/activityManage/addActivity',
          name: 'addActivity',
          component: addActivity,
          meta: {
            title: '创建社团活动',
          }
        },
        {
          path: '/index/activityManage/editActivity',
          name: 'editActivity',
          component: editActivity,
          meta: {
            title: '编辑社团活动',
          }
        },
        {
          path: '/index/departManage',
          name: 'departManage',
          component: departManage,
          meta: {
            title: '部门管理列表',
          }
        },
        {
          path: '/index/departManage/addDepart',
          name: 'addDepart',
          component: addDepart,
          meta: {
            title: '添加部门',
          }
        },
        {
          path: '/index/identityChange',
          name: 'identityChange',
          component: identityChange,
          meta: {
            title: '身份变更',
          }
        },
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
        },
        {
          path: '/index/web/recruitNew',
          name: 'recruitNew',
          component: recruitNew,
          meta: {
            title: '社团招新'
          }
        },
        {
          path: '/index/web/applyTable',
          name: 'applyTable',
          component: applyTable,
          meta: {
            title: '申请表格'
          }
        },
        {
          path: '/index/web/morePage',
          name: 'morePage',
          component: morePage,
        },
      ]
    },
  ]
})
