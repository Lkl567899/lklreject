const ShoppingKey = "sp_key";
const searchKey = "spSearch_key";

//取
export const getInfo = () => {
  const obj = {
    token: "",
    userId: "",
  };
  const result = localStorage.getItem(ShoppingKey);
  return result ? JSON.parse(result) : obj;
};
//存
export const setInfo = (obj) => {
  localStorage.setItem(ShoppingKey, JSON.stringify(obj));
};
//删
export const delInfo = () => {
  localStorage.removeItem(ShoppingKey);
};

//搜索相关
export const getSearch = () => {
  const result = localStorage.getItem(searchKey);
  return result ? JSON.parse(result) : [];
};
export const setSearch = (arr) => {
  localStorage.setItem(searchKey, JSON.stringify(arr));
};
