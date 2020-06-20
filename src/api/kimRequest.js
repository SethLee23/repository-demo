/*
 * @Author: your name
 * @Date: 2020-04-28 16:28:58
 * @LastEditTime: 2020-05-10 17:20:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd-h5web\src\api\kimRequest.js
 */
import axios from 'axios'
import store from '../store/index'
const service = axios.create({
  // baseURL: 'https://im.devapi.kissneck.com.cn/api',// 接口的域名地址
  baseURL: 'https://im.api.kissneck.com.cn/api',// 接口的域名地址
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Access-Api-Token': '4f86fb32988f64380bfc6d9d476a6dc5',
  }
})
/**
* 请求响应拦截
* 用于处理需要在请求返回后的操作
*/
service.interceptors.response.use(response => {
  const responseCode = response.status
  // console.log('response axios', response.data.code, response)
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode >= 200 && responseCode < 400) {
    if (response.data.code == 10060&&localStorage.kimid) {
      console.log('关闭socket123')
      store.dispatch("main/kim/reLogin")
    }
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, error => {
  return Promise.reject(error)
})

// export default function request(url, data = {}, method = 'get',headers) {
export default function request(url, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method,
    };
    if (method.toLowerCase() === 'get') {
      options.params = data
    }
    // if (headers) {
    //       options.headers =headers
    //   }
    else {
      options.data = data
    }

    service(options).then(res => {
      // console.log('返回数据', res)
      resolve(res.data)
    })
      .catch(error => {
        reject()
        console.error(error)
      })
  })
}
