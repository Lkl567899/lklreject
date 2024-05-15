import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Loign";
import Layout from "@/views/Layout";
import Search from "@/views/Search/index.vue";
import SearchList from "@/views/Search/list.vue";
import Prodetail from "@/views/Prodetail";
import Pay from "@/views/Pay";
import Myorder from "@/views/Myorder";
import Address from '@/views/address/index.vue'
import AddressForm from '@/views/address/form.vue'
//二级路由
import Home from "@/views/Layout/home.vue";
import Cart from "@/views/Layout/cart.vue";
import category from "@/views/Layout/category.vue";
import User from "@/views/Layout/user.vue";
import store from "@/store";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/login", component: Login },
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        { path: "/home", component: Home },
        { path: "/cart", component: Cart },
        { path: "/category", component: category },
        { path: "/user", component: User },
      ],
    },
    { path: "/search", component: Search },
    { path: "/searchlist", component: SearchList },
    { path: "/prodetail/:id", component: Prodetail },
    { path: "/pay", component: Pay },
    { path: "/myorder", component: Myorder },
    { path: "/Address", component: Address },
    { path: "/Addressfrom", component: AddressForm },
  ],
});
//导航拦截
const authUrls = ["/pay", "/myorder"];
router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next();
    return;
  }
  const token = store.getters.token;
  if (token) {
    next();
  } else {
    next("/login");
  }
});
export default router;
