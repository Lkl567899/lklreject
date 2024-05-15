import request from "@/utils/request";
//获取详情页数据
export const GetProdetailListAPI = (goodsId) => {
  return request.get("/goods/detail", {
    params: {
      goodsId,
    },
  });
};

//获取评论
export const GetViews = (goodsId) => {
  return request.get("/comment/listRows", {
    params: {
      goodsId,
      limit: 5,
    },
  });
};
