<template>
  <div class="myorder">
    <van-nav-bar title="订单结算台" fixed left-arrow @click-left="$router.go(-1)" />
    <van-tabs v-model="active" sticky>
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>
    <div v-if="list.length">
      <OrderItem v-for="item in list" :key="item.order_id" :list="item" @success="success"></OrderItem>
      <div class="tips">亲没有更多了~</div>
    </div>
    <div v-else>
      <van-empty description="亲 暂无更多订单记录~" />
    </div>
  </div>
</template>

<script>
import { GetOrderListAPI } from '@/api/order'
import OrderItem from '@/components/OrderItem.vue';
export default {
  data() {
    return {
      active: this.$route.query.dataType || 'all',
      list: []
    }
  },
  components: {
    OrderItem
  },
  methods: {
    async GetOrderListData() {
      const { data: { list } } = await GetOrderListAPI(this.active)
      list.data.forEach(item => {
        item.total_num = 0
        item.goods.forEach(goods => {
          item.total_num += goods.total_num
        })
      })
      this.list = list.data
      console.log(this.list);
    },
    success(){
      this.GetOrderListData()
    }
  },
  watch: {
    active: {
      immediate: true,
      handler() {
        this.GetOrderListData()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myorder {
  margin-top: 47px;

  .tips {
    text-align: center;
    padding: 16px 0;
    background: transparent;
    color: gray;
  }
}
</style>
