const path = require('path') // 路径解析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
function resolve (dir) { // 获取绝对路径
  return path.join(__dirname, dir)
}
module.exports = {
  productionSourceMap: !IS_PROD,
  indexPath: IS_PROD ? '../../WEB-INF/vm/newsrm/index.vm' : '/',
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    host: 'local.new-srm.cx.test.yunshanmeicai.com',
    port: 8080,
    proxy: {
      '/': {
        target: process.env.VUE_APP_PROXY_TARGET,
        ws: false,
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('styles', resolve('src/assets/styles'))
  }
}
