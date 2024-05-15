import store from "@/store";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://smart-shop.itheima.net/index.php?s=/api",
  timeout: 5000,
});
import { Toast } from "vant";
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const token = store.getters.token;
    config.headers["Access-Token"] = token;
    config.headers.platform = "H5";
    // 在发送请求之前做些什么
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0,
    });
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const res = response.data;
    if (res.status !== 200) {
      Toast(res.message);
      return Promise.reject(res.message);
    } else {
      Toast.clear(); //关闭加载
    }
    return res;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;