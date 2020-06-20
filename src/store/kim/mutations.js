/*
 * @Author: your name
 * @Date: 2020-06-20 16:57:51
 * @LastEditTime: 2020-06-20 17:32:49
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \src\store\kim\mutations.js
 */ 
import { Message } from 'element-ui'
const mutations = {
    setTestNum(state, val) {
        state.testNum = val;
        console.log('testNum in kim changed!now is ', state.testNum);
    }

}
export default mutations
