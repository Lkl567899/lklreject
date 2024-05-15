import { delCartItem, getCart, setCartCount } from "@/api/cart";

export default {
  namespaced: true,
  state() {
    return {
      cartList: [{}],
    };
  },
  mutations: {
    //获取购物车列表数据
    setCartList(state, data) {
      state.cartList = data;
    },
    //修改小选框状态
    editChecked(state, id) {
      const goods = state.cartList.find((item) => item.goods_id === id);
      goods.isChecked = !goods.isChecked;
    },
    //全选控制反选
    setAllchecked(state, flag) {
      state.cartList.forEach((item) => {
        item.isChecked = flag;
      });
    },
    //修改购物车数量
    changeCount(state, { goodsId, value }) {
      const obj = state.cartList.find((item) => item.goods_id === goodsId);
      obj.goods_num = value;
    },
  },
  actions: {
    //获取购物车列表数据
    async getCartActions(context) {
      const { data } = await getCart();
      //手动维护 加属性
      data.list.forEach((item) => {
        item.isChecked = true;
      });
      context.commit("setCartList", data.list);
    },
    //修改购物车数量
    async changeCountAction(context, obj) {
      const { value, goodsId, skuId } = obj;
      //先修改vuex
      context.commit("changeCount", { goodsId, value });
      //再修改后端
      await setCartCount(goodsId, value, skuId);
    },
    //删除购物车商品
    async delCartList(context) {
      const selCartList = context.getters.selCartList;
      const counts = selCartList.map((item) => item.id);
      await delCartItem(counts);
      //拉取最新数据
      context.dispatch("getCartActions");

    },
  },
  getters: {
    //统计所有商品
    cartTotal(state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0);
    },
    //选中的商品项
    selCartList(state) {
      return state.cartList.filter((item) => item.isChecked);
    },
    //选中的总数
    selCount(state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0);
    },
    //选中的总价
    selPrice(state, getters) {
      return getters.selCartList
        .reduce(
          (sum, item) => sum + item.goods_num * item.goods.goods_price_min,
          0
        )
        .toFixed(2);
    },
    //全选状态
    allChecked(state) {
      return state.cartList.every((item) => item.isChecked);
    },
  },
};
