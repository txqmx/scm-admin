let RouterConfig = [ // 走layout中的路由
  {
    path: '/',
    name: 'Home',
    title: '首页',
    type: 'view', // 类型: folder, view
    noAuth: true,
    inNav: true // 是否在导航中显示,还没用上
  },
  {
    path: '',
    name: 'caidan1',
    title: '菜单1',
    type: 'folder', // 类型: folder, view
    filePath: 'views/home1/', // 文件路径
    inNav: true, // 是否在导航中显示
    children: [
      {
        title: 'page1',
        type: 'view', // 默认当view处理
        name: '/home1/page1',
        path: '/home1/page1',
        filePath: 'views/home1/page1.vue',
        noAuth: true, // 是否跳过权限控制, type=view 有效
        inNav: true
      }
    ]
  }
]

export default RouterConfig
