import request from "@/utils/request";
//获取地址列表
export const getaddressList = () => {
  return request.get("/address/list");
};
//设置默认地址
export const postLastAddressId = (addressId) => {
  return request.post("/address/setDefault", {
    addressId,
  });
};
//默认收货地址Id
export const getDefaultId = () => {
  return request.get("/address/defaultId");
};
//获取收货地址详情
export const getAddressDetailId = (addressId) => {
  return request.get("/address/detail", {
    params: {
      addressId,
    },
  });
};
//编辑收货地址
export const setAddressListId = (addressId, isName, phone, region, detail) => {
  return request.post("/address/edit", {
    addressId,
    form: {
      name: isName,
      phone,
      region,
      detail,
    },
  });
};
//添加收货地址
export const addAddressListId = (isName, phone, region, detail) => {
  return request.post("/address/add", {
    form: {
      name: isName,
      phone,
      region,
      detail,
    },
  });
};
//删除收货地址
export const delAddressItem = (addressId) => {
  request.post("/address/remove", {
    addressId,
  });
};
