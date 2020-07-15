import request from './request';
// 接口封装
const api = {
  articleList: data => {
    return request('informationList', data, 'get');
  }, // 热点列表
  getHotDetail: data => {
    return request('informationRead', data, 'get');
  }, // 热点详情
  articleCat: data => {
    return request('informationType', data, 'get');
  } // 热点-文章类型列表
};

export default api;
