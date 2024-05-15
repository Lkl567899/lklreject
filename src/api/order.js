import request from "@/utils/request";
//订单结算
export const GetCheckoutOrderAPI = (mode, obj) => {
  return request.get("/checkout/order", {
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj,
    },
  });
};
//提交订单
export const PostCheckoutSubmitAPI = (mode, obj) => {
  return request.post("/checkout/submit", {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 10,
    ...obj,
  });
};
//我的订单
export const GetOrderListAPI = (dataType) => {
  return request.get("/order/list", {
    params: {
      page: 1,
      dataType,
    },
  });
};
//取消订单
export const PostOrderCancelAPI = (orderId) => {
  return request.post("/order/cancel", {
    orderId,
  });
};
// 获取个人信息
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}
