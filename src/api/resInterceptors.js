import Vue from 'vue'
// 请求成功
export function successFn (res) {
  if (!res.headers['content-type'].includes('json')) {
    return res
  }
  if (res && res.data && res.data.ret === 1) {
    return res.data
  }
  // 接口状态错误
  let message = '接口返回错误' // 错误提示
  if (res.data) {
    if (res.data.error && res.data.error.msg) {
      message = res.data.error.msg
    }
    if (res.data.errMsg) {
      message = res.data.errMsg
    }
  } else {
    if (res.errMsg) {
      message = res.errMsg
    }
  }
  Vue.prototype.$message({
    message,
    type: 'error',
    duration: 3500
  })
  return Promise.reject(message)
}

// 请求失败
export function errorFn (error) {
  let message
  // 接口不通
  if (!error.response) {
    message = '服务器错误'
  }
  // 接口请求超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    message = '接口请求超时'
  }
  Vue.prototype.$message({
    message,
    type: 'error',
    duration: 3500
  })
  return Promise.reject(message)
}
