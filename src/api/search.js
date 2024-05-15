import request from "@/utils/request";
export const GetSearchListAPI = (goodsName, sortType, categoryId) => {
  return request.get("/goods/list", {
    params: {
      sortType, //all-按综合搜索(默认)，sales-按销量搜索，price-按价格搜索
      categoryId, //热门页进来的
      goodsName, //商品名称
      page: 1, //分页
    },
  });
};
