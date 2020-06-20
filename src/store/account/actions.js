/*
 * @Author: your name
 * @Date: 2020-06-20 16:57:51
 * @LastEditTime: 2020-06-20 17:33:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \src\store\account\actions.js
 */ 
import $api from '../../api/api'
import router from '../../router/index'
import { Message } from 'element-ui'
const actions = {
  //学习用
  changeTestNum(context, num) {
    context.commit('setTestNum', num);
  }

}
export default actions