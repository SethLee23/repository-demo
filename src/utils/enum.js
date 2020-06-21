/*
 * @Author: your name
 * @Date: 2020-05-01 20:03:47
 * @LastEditTime: 2020-05-01 22:04:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dyd-h5web\src\utils\enum.js
 */
import router from "../router/index";

// 定义类型--用于查看
const status = {
  APPOINT_STATUS: 1, //可预约
  LIVING_STATUS: 2, //开始直播
  LIVING_GONE: 3, //直播结束无视频
  RECORD_STATUS: 4 //直播结束有视频
};

// 页面类型
const pageType = {
  LIVING: 0, //直播
  RECORD: 1 //录播
};

// 对应关系
const statusToType = {
  1: "LIVING",
  2: "LIVING",
  3: "LIVING", //暂定跳转录播页面内
  4: "RECORD"
};

// 跳转详情页面
function viewDetail({ status, id, group_id }) {
  const routeName = "live";
  const type = statusToType[status];
  router.push({
    name: routeName,
    params: {
      id,
      type: pageType[type],
      group_id
    }
  });
}

// function
export { viewDetail, statusToType, status };
