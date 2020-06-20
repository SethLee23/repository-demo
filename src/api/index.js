/** 
 * 封装 axios 请求
 * 1. 处理 token
 * 2. 处理请求 loading
 * 3. 处理 断网 或者 请求超时
 * 4. 处理不是响应以 2xx 开头的情况
 */
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import store from '../store'
const service = axios.create({
    // 设置超时时间
    timeout: 20000,
    baseURL: "http://live.api.deltamedical.cn/v1/",
    // baseURL: "http://dyd.api.kissneck.com.cn/v1",
})
let loading = null
import { Toast } from 'vant';
// 需要轮询的接口
var pollApis = ['getLiveCount', 'touristsmsg']
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
service.interceptors.request.use(config => {
    // 非轮询接口展示loading
    if (pollApis.indexOf(config.url)==-1) {
        // 在请求先展示加载框
        loading = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            loadingType: 'circular',
            duration: 0
        });
    }

const token = localStorage.getItem('token')
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config
}, (error) => {
    return Promise.reject(error)
})
/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
service.interceptors.response.use(response => {
    // console.log('response',response.headers['X-AUTH-TOKEN'])
    if (response.headers['X-AUTH-TOKEN']) {
        localStorage.setItem("token", response.config.headers['X-AUTH-TOKEN'])
    }
    // 请求响应后关闭加载框
    if (loading) {
        setTimeout(() => {
            Toast.clear();
        }, 333)

    }
    const responseCode = response.status
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (responseCode === 200) {
        // 用于测试
        // console.log('response.data',response.data)
        try {
            if (response.data.data.token) {
                localStorage.setItem('token', response.data.data.token.t)
            }
        } catch (e) {
            console.log('interceptors exception', e)
        }

        if (response.data.code == 3) {
            localStorage.removeItem('token')
            router.replace({ name: 'login' })
            store.dispatch("kimLoginOut").then(res => {
            }).catch(err => {
                console.log(err)
            })

        }

        if (response.data.code == 402) {
            // 展示企业认证弹窗
            store.commit('showCert', true)
        }
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}, error => {
    // 请求响应后关闭加载框
    if (loading) {
        setTimeout(() => {
            Toast.clear();
        }, 0)

    }

    // 断网 或者 请求超时 状态
    if (!error.response) {
        // 请求超时状态
        if (error.message.includes('timeout')) {
            console.log('超时了')
            // Message({
            //     message: '请求超时，请检查网络是否连接正常',
            //     type: 'error',
            //     customClass: "message-error",
            // })
        } else {
            // 可以展示断网组件
            console.log('断网了')
            Message({
                message: '请求失败，请检查网络是否已连接',
                type: 'error',
                customClass: "message-error",
            })
        }
        return
    }

    // 服务器返回不是 2 开头的情况，会进入这个回调
    // 可以根据后端返回的状态码进行不同的操作
    const responseCode = error.response.status
    switch (responseCode) {
        // 401：未登录
        case 401:
            console.log('跳转登录页')
            // 跳转登录页
            Message({
                message: '登录已过期，请重新登录',
                type: 'error',
                customClass: "message-error",
            })
            router.replace({
                path: '/login',
                query: {
                    redirect: router.currentRoute.fullPath
                }
            })
            break
        // 403: token过期
        case 403:
            // 弹出错误信息
            Message({
                type: 'error',
                message: '登录信息过期，请重新登录',
                customClass: "message-error",
            })
            // 清除token
            localStorage.removeItem('token')
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
            }, 1000)
            break
        // 404请求不存在
        case 404:
            Message({
                message: '网络请求不存在',
                type: 'error',
                customClass: "message-error",
            })
            break
        // 其他错误，直接抛出错误提示
        default:
            Message({
                message: error.response.data.message,
                type: 'error',
                customClass: "message-error",
            })
    }
    return Promise.reject(error)
})

export default service