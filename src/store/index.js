import Vue from 'vue'
import Vuex from 'vuex'
import routerConfig from '@/config/routerConfig' // 引入路由配置，做权限处理
import * as getters from './getters'
import api from '@/api'

Vue.use(Vuex)

let state = {
  // 路由(菜单)配置
  routerConfig,
  auths: [], // 用户权限
  // 用户信息
  userName: '??',
  roleName: '???',
  currentCityName: '北京',
  allCityList: [{ // 切换城市
    name: '北京',
    id: 1
  }]

}

let mutations = {
  setUserInfo  (state, val) {
    state.userName = val.name || '??'
    state.auths = val.authUrls || []
    state.roleName = val.role_name || '??？'
    state.currentCityName = val.current_city_name || ''
    state.allCityList = val.own_cities || []
  }
}

let actions = {
  // 获取用户信息
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      api.getUserInfo().then(res => {
        commit('setUserInfo', res.data)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 退出登录
  logOut () {
    return new Promise((resolve, reject) => {
      api.logOut().then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 切换城市
  switchCity ({ commit }, cityId) {
    return new Promise((resolve, reject) => {
      api.switchCity(cityId).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
