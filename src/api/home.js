import request from "@/utils/request";
//获取首页数据
export const GetHomePageDetailAPI = () => {
  return request.get("/page/detail");
};
