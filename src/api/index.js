import axios from 'axios'
import { PublicController } from '@/api/controller'
const basePath = '/public'

export default {
  // 公共接口
  getUserInfo: () => PublicController.post('/getUserInfo'), // 获取用户信息
  logOut: () => axios.get(`${basePath}/logout`), // 登出账号
  switchCity: (cityId) => axios.get(`${basePath}/switchCity?cityId=${cityId}`)
}
