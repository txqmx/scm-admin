import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from './home-router'
import Layout from '@/components/layout/layout.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      ...homeRouter
    ]
  },
  // 通用路由
  {
    path: '/noAuthority',
    name: 'noAuthority',
    component: () => { return import(/* webpackChunkName:'errorCompoents' */'@/components/common/NoAuthority.vue') },
    meta: {
      noAuth: true
    }
  },
  {
    path: '*',
    name: '404',
    component: () => { return import(/* webpackChunkName:'errorCompoents' */'@/components/common/404.vue') },
    meta: {
      noAuth: true
    }
  }
]

const router = new Router({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.meta && !to.meta.isAuth) {
    if (!to.meta.noAuth) {
      next({ path: '/noAuthority' })
      return
    }
  }
  next()
})

export default router
