/**
 * Created by zzmhot on 2017/3/23.
 *
 * 路由Map
 *
 * @author: zzmhot
 * @github: https://github.com/zzmhot
 * @email: zzmhot@163.com
 * @Date: 2017/3/23 18:30
 * @Copyright(©) 2017 by zzmhot.
 *
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'

import stockinComponent from 'pages/stockin/list'

import stockinSaveComponent from 'pages/stockin/save'

//sort table
import sortTableComponent from 'pages/table/sort'
//save table
import saveTableComponent from 'pages/table/save'
//bar charts
import barChartsComponent from 'pages/charts/bar'

//parts
import partsComponent from 'pages/parts/index'
import partsCategoryComponent from 'pages/parts/category'
import partsCreateComponent from 'pages/parts/create'

import serviceComponent from 'pages/service/index'
import serviceSaveComponent from 'pages/service/save'
import serviceCategoryComponent from 'pages/service/category/index'
import serviceCategoryCreateComponent from 'pages/service/category/create'

Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "主页",
      auth: true
    }
  }, {
    path: '/offline_service',
    name: 'offline_service',
    component: baseTableComponent,
    meta: {
      title: "维修开单",
      auth: true
    }
  }, {
    path: '/user',
    name: 'user',
    component: sortTableComponent,
    meta: {
      title: "客户档案",
      auth: true
    }
  }, {
    path: '/parts',
    name: 'parts',
    component: partsComponent,
    children: [
      {
        path: 'category',
        component: partsCategoryComponent
      },
      {
        path: 'create',
        component: partsCreateComponent
      }
    ],
    meta: {
      title: "配件库存",
      auth: true
    },
  },
    {
      path: '/parts/stock_in',
      component: stockinComponent
    },
    {
      path: '/parts/stock_in/create',
      component: stockinSaveComponent
    },
    {
      path: '/parts/stock_in/import',
      component: sortTableComponent
    },
    {
      path: '/service',
      component: serviceComponent,
      children: [
        {
          path: 'list',
          component: serviceComponent
        },
        {
          path: 'import',
          component: partsCreateComponent
        },
        {
          path: 'cat_create',
          component: partsCreateComponent
        },
        {
          path: 'log',
          component: partsCreateComponent
        }
      ],
      meta: {
        title: "服务项目",
        auth: true
      }
    },
    {
      path: '/service/create',
      name: 'serviceCreate',
      component: serviceSaveComponent,
      meta: {
        title: "创建工时项目",
        auth: true
      }
    },
    {
      path: '/service/update/:id',
      name: 'serviceUpdate',
      component: serviceSaveComponent,
      meta: {
        title: "更新工时项目",
        auth: true
      }
    },
    {
      path: '/service/category',
      component: serviceCategoryComponent,
      meta: {
        title: "工时分类",
        auth: true
      }
    },
    {
      path: '/service/category/create',
      name: 'serviceCatCreate',
      component: serviceCategoryCreateComponent,
      meta: {
        title: "创建工时类别",
        auth: true
      }
    },
    {
      path: '/service/category/update/:id',
      name: 'serviceCatUpdate',
      component: serviceCategoryCreateComponent,
      meta: {
        title: "更新工时类别",
        auth: true
      }
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: barChartsComponent,
      meta: {
        title: "微信管理",
        auth: true
      }
    }
    ,
    {
      path: '/scheme1',
      name: 'scheme1',
      component: saveTableComponent,
      meta: {
        title: "拓客方案",
        auth: true
      }
    }
    ,
    {
      path: '/finance',
      name: 'finance',
      component: sortTableComponent,
      meta: {
        title: "财务管理",
        auth: true
      }
    }
    ,
    {
      path: '/staff',
      name: 'staff',
      component: barChartsComponent,
      meta: {
        title: "员工绩效",
        auth: true
      }
    }
    ,
    {
      path: '/report',
      name: 'report',
      component: sortTableComponent,
      meta: {
        title: "决策报表",
        auth: true
      }
    }
    ,
    {
      path: '/setting',
      name: 'setting',
      component: barChartsComponent,
      meta: {
        title: "系统设置",
        auth: true
      }
    }
  ]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
