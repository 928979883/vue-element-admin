import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Config from '@/settings'

// 1. 服务端对每一个请求都会验证权限
// 2. request拦截器 在每个请求头里面塞入token，好让后端对请求进行权限验证
// 3. respone拦截器 当服务端返回特殊的状态码，我们统一做处理，如没权限或者token失效等操作

// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 当跨域请求发送cookie
  timeout: 5000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 该处可以在发送请求之前做些什么

    if (store.getters.token) {
      // 让每个请求携带令牌 ['Authorization']
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    if (Config.tenantId) {
      config.headers['TENANT-ID'] = Config.tenantId
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果您想获取http信息，如头或状态
   * 请返回response => response
   *
   * 通过自定义代码确定请求状态
   * 这里只是一个例子
   * 您也可以通过HTTP状态码来判断状态
   */
  response => {
    const res = response.data
    // 如果res.code不是20000，则判定为错误。
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法令牌;50012:已登录的其他客户端;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
