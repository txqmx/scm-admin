import axios from 'axios'
import { successFn, errorFn } from './resInterceptors'

// aph mock工具
if (process.env.NODE_ENV === 'aph') {
  axios.defaults.headers.post['aph_key'] = process.env.VUE_APP_APH_KEY
}
// 接口延时限制
axios.defaults.timeout = 5000

// 手动定义接口
const PublicController = axios.create({ baseURL: '/public' })

const controllerArr = [ PublicController ]
controllerArr.forEach(controller => {
  controller.interceptors.response.use(successFn, errorFn)
})

export { PublicController }
