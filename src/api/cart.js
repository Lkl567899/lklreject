import request from "@/utils/request";
//商品加入到购物车
export const addCartList = (goodsId, goodsNum, goodsSkuId) => {
  return request.post("/cart/add", {
    goodsId, //商品id
    goodsNum, //商品数量
    goodsSkuId, //商品二级id
  });
};
//获取购物车数量
export const GetCartTotal = () => {
  return request.get("/cart/total");
};
//获取购物车列表
export const getCart = () => {
  return request.get("/cart/list");
};
//修改购物车数量
export const setCartCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post("/cart/update", {
    goodsId,
    goodsNum,
    goodsSkuId,
  });
};
//删除购物车中的商品
export const delCartItem  = (cartIds) =>{
  return request.post('/cart/clear',{
    cartIds
  })
}
