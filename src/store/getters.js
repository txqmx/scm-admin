import { cloneDeep } from 'lodash'

// 深度遍历路由
const deepTravel = (obj, fn) => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      deepTravel(item, fn)
    })
    return
  }
  if (obj && obj.children) {
    deepTravel(obj.children, fn)
    fn(obj)
    return
  }
  if (obj.path) {
    fn(obj)
  }
}

export const authRouterConfig = (state) => {
  // 增加权限处理方法
  let { routerConfig, auths } = state
  let authRouter = cloneDeep(routerConfig)
  deepTravel(authRouter, (item) => {
    if (item.type === 'folder') { // 只要二级菜单有一个有权限 一级就有权限
      item.isAuth = item.children.some(item1 => item1.isAuth)
    } else {
      let path = item.path.toLowerCase()
      item.isAuth = item.noAuth ? true : auths.includes(path) // 设置跳过权限，则直接给true
    }
  })
  return authRouter
}
