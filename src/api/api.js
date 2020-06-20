/*
 * @Author: seth
 * @Date: 2020-04-28 16:28:58
 * @LastEditTime: 2020-05-07 21:44:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd-h5web\src\api\api.js
 */
// 接口封装
import request from './request'
import kimRequest from './kimRequest'
const api = {
    // kim
    kimLogout: data => { return kimRequest('logout', data, 'post') },//登出
    creategroup: data => { return kimRequest('groups', data, 'post') },//创建群聊
    getgroup: data => { return kimRequest("groups", data) },//获取群聊
    getFriendList: data => { return kimRequest("friendlist", data) },//获取好友列表
    addblacklist: data => { return kimRequest("addblacklist", data) },//拉黑好友
    groupInfo: (num, data) => { return kimRequest(`groups/${num}`, data) },//获取群聊消息
    changeInfo: data => { return kimRequest(`update-group`, data, 'post') },//更新群
    deletegroup: (data) => { return kimRequest('remove-group', data, 'post') },//解散群
    getgroupmember: data => { return kimRequest('group-member-list', data, 'post') },//获取群成员
    invitegroupmember: data => { return kimRequest('join-group', data, "post") },//邀请群成员
    leavegroup: data => { return kimRequest('leave-group', data, "post") },//移出群成员
    setlevel: data => { return kimRequest('set-group-level', data, "post") },//给与权限
    addgroup: data => { return kimRequest('creategrouping', data, 'post') },//创建分组
    searchFriend: data => { return kimRequest('searchfriends', data, 'post') },//搜索好友
    addFriend: data => { return kimRequest('friend', data, 'post') },//添加好友
    showFriendList: data => { return kimRequest('friend', data) },//展示好友分组列表
    uploads: data => { return kimRequest('uploads', data, "post") },//上传图片视频音频
    messageList: data => { return kimRequest('message?' + data) },//获取消息列表
    getmsg: data => { return kimRequest('getmsg?' + data) },//获取历史消息
    sendmessage: data => { return kimRequest('sendmessage', data, "post") },//发送消息
    ingroupChat: data => { return kimRequest('ingroup-chat', data, "post") },//进入群聊
    delmsg: data => { return kimRequest('delmsg?' + data) },//删除消息列表
    uploadfile: data => { return kimRequest('uploadfile', data, "post") },//测试上传文件，后面可删除
    uploadss: data => { return kimRequest('uploadss', data, "post") },//发送音频测试
    touristsMsg: data => { return kimRequest('touristsmsg', data, "get") },//游客获取历史消息


    //首页
    homePage: data => { return request('homePage', data, "get") },//首页数据
    banner: data => { return request('banner', data, "get") },//首页轮播图
    getCode: data => { return request('getCode', data, "get") },//获取验证码
    register: data => { return request('register', data, "post") },//注册
    login: data => { return request('login', data, "get") },//登录
    liveInfo: data => { return request('liveInfo', data, "get") },//直播 or 录播 详情
    addAppointment: data => { return request('addAppointment', data, "get") },//添加预约
    addCount: data => { return request('addCount', data, "get") },//添加人数（添加直播/同问人数）
    sensitiveWord: data => { return request('sensitiveWord', data, "get") },//敏感词接口
    getLiveNum: data => { return request('getLiveCount', data, "get") },//获取直播人数接口
    wxAuth: data => { return request('shareCode', data, "get") },//微信授权

}

export default api