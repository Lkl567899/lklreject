import { getInfo, setInfo } from "@/utils/storeage";
export default {
  namespaced: true,
  state() {
    return {
      //个人权证相关
      userInfo: getInfo(),
    };
  },
  mutations: {
    //存储token跟userid
    setUserinfo(state, obj) {
      state.userInfo = obj;
      //存本地实现信息持久化存储
      setInfo(obj);
    },
  },
  actions: {
    logout(context) {
      context.commit("setUserinfo", {});
      context.commit('cart/setCartList', [], {
        root: true
      })
    },
  },
  getters: {},
};
