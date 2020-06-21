/* eslint-disable no-unused-vars */
/*
 * @Author: your name
 * @Date: 2020-06-20 16:57:51
 * @LastEditTime: 2020-06-20 18:16:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\store\kim\actions.js
 */
import $api from "../../api/api";
import router from "../../router/index";

const actions = {
  // 学习用
  changeTestNum(context, num) {
    context.commit("setTestNum", num);
  }
};
export default actions;
