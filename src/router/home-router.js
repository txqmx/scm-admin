import store from '@/store'

// 深度遍历配置树, 摘取叶子节点作为路由部分
function deepTravel (config, fn) {
  if (Array.isArray(config)) {
    config.forEach(item => {
      deepTravel(item, fn)
    })
  } else if (config.children) {
    config.children.forEach(item => {
      deepTravel(item, fn)
    })
  } else {
    fn(config)
  }
}

const homeRouter = []
let RouterConfig = store.getters.authRouterConfig

deepTravel(RouterConfig, (routerItem) => {
  const viewRouter = {}
  viewRouter.path = routerItem.path
  viewRouter.name = routerItem.name
  viewRouter.meta = {
    title: routerItem.title,
    isAuth: routerItem.isAuth,
    href: routerItem.href
  }
  if (routerItem.filePath) {
    viewRouter.component = () => import(/* webpackChunkName:'home' */`@/${routerItem.filePath}`)
  }
  homeRouter.push(viewRouter)
})

export default homeRouter
