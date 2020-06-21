/*
 * @Author: seth
 * @Date: 2020-04-30 12:00:52
 * @LastEditTime: 2020-05-08 16:09:06
 * @LastEditors: Please set LastEditors
 * @Description: 微信相关配置
 * @FilePath: \dyd-h5web\src\models\wx.js
 */
import api from "../api/api";
import { Toast } from "vant";
class WXModel {
  constructor() {}
  // 微信登录设置 token
  static setWxToken() {
    let href = window.location.href;
    return new Promise((resolve, reject) => {
      // let href = 'http://dyd.web.kissneck.com.cn/#/index?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxYzNkNzhmMS1mNTcyLTQ2ZGUtYTQ1OS0yNGQzZTkzMGUwOTAiLCJpc3MiOiJkb21haW4iLCJpYXQiOjE1ODgyMTkwOTQsImV4cCI6MTU4ODgyMzg5NCwibWlkIjoxMDAxMX0.YGI974VLMrkJDf5MzYC3GdrA4QHDSaBsvIMWUIOrI0s&mid=10011&nickname=blublu'
      if (href.indexOf("?") > 0 && href.indexOf("token") != -1) {
        try {
          var array = href.split("?")[1].split("&");
          let params = {};
          array.forEach(item => {
            let i = item.split("=");
            Object.assign(params, { [`${i[0]}`]: `${i[1]}` });
          });
          let { token, mid, nickname } = params;
          nickname = decodeURI(nickname);
          console.log("nick", nickname);
          localStorage.setItem("token", token);
          localStorage.setItem("kimid", mid);
          localStorage.setItem("nickname", nickname);
          resolve(params);
        } catch (e) {
          reject(e);
          throw new Error(e);
        }
      } else {
        if (!localStorage["token"]) {
          reject("微信授权登录失败！");
          alert("微信授权登录失败！");
        }
      }
    });
  }
  // 微信配置
  static async wxConfig() {
    var appId, timestamp, nonceStr, signature, data;
    api.wxAuth(data).then(res => {
      if (res.code == 1) {
        appId = res.data.appId;
        timestamp = res.data.timestamp;
        nonceStr = res.data.noncestr;
        signature = res.data.signature;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名
          jsApiList: ["onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
        });
      } else {
        console.log(res);
      }
    });
    wx.error(err => {
      console.log("app初始化err", err);
    });
  }
  // 检查微信 api
  static async WxReadyCheckApi() {
    return new Promise((resolve, reject) => {
      wx.checkJsApi({
        jsApiList: ["onMenuShareAppMessage"],
        success: function(res) {
          console.log(res);
          resolve(res);
        }
      });
    });
  }
  // 微信分享信息配置
  static shareMessageConig({ link, imgUrl, title = "", desc = "" }) {
    wx.onMenuShareAppMessage({
      title: "德美医疗", // 分享标题
      desc: "快来和我一起看直播吧！", // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      type: "", // 分享类型,music、video或link，不填默认为link
      dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
      success: function() {
        // 用户确认分享后执行的回调函数
        Toast({ message: "您已分享", position: "bottom" });
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
        Toast("您已取消分享");
      }
    });
  }
}
export default WXModel;
