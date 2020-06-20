/*
 * @Author: your name
 * @Date: 2020-06-20 16:57:49
 * @LastEditTime: 2020-06-20 18:01:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \dyd\src\api\request.js
 */
// 请求函数封装
import service from './index';

// export default function request(url, data = {}, method = 'get',headers) {
export default function request(url, data = {}, method = 'get') {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method,
    };
    if (method.toLowerCase() === 'get') {
      options.params = data;
    } else {
      options.data = data;
    }

    service(options).then((res) => {
      // console.log('返回数据', res)
      resolve(res.data);
    })
      .catch((error) => {
        reject();
        console.error(error);
      });
  });
}
