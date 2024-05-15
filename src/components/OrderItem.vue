<template>
  <div class="order">
    <div class="orderItem" v-if="list.order_id">
      <div class="item-top">
        <div class="item-top-left">{{ list.create_time }}</div>
        <div class="item-top-right">{{ list.state_text }}</div>
      </div>
      <div class="list">
        <div class="list-item" v-for="(goods, index) in list.goods" :key="index">
          <div class="goods-img">
            <img :src="goods.goods_image" alt="">
          </div>
          <div class="goods-content text-ellipsis-2">{{ goods.goods_name }}</div>
          <div class="goods-trade">
            <p>¥{{ goods.total_pay_price }}</p>
            <p>x{{ goods.total_num }}</p>
          </div>
        </div>
      </div>
      <div class="total">
        共 {{ list.total_num }} 件商品，总金额 ¥{{ list.total_price }}
      </div>
      <div class="actions">
        <div v-if="list.order_status === 10">
          <span v-if="list.pay_status === 10">立刻付款</span>
          <span @click="delItem(list.order_id)" v-else-if="list.delivery_status === 10">申请取消</span>
          <span v-else-if="list.delivery_status === 20 || list.delivery_status === 30">确认收货</span>
        </div>
        <div v-if="list.order_status === 30">
          <span>评价</span>
        </div>
      </div>
    </div>
    <div class="tips" v-else>亲没有更多了~</div>
  </div>

</template>

<script>
import { PostOrderCancelAPI } from '@/api/order'
export default {
  props: {
    list: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    async delItem(id) {
      await PostOrderCancelAPI(id)
      this.$toast.success('操作成功')
      this.$emit('success')
    }
  }
}
</script>

<style lang="less">
.orderItem {
  margin: 10px auto;
  width: 94%;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 0 0.5px 2px 0 rgba(0, 0, 0, .05);
  border-radius: 8px;
  color: #333;
  font-size: 13px;

  .item-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    margin-bottom: 21px;

    .item-top-right {
      color: red;
    }
  }

  .list {
    .list-item {
      display: flex;

      .goods-img {
        width: 90px;
        height: 90px;
        margin: 0px 10px 10px 0;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .goods-content {
        flex: 2;
        line-height: 18px;
        max-height: 36px;
        color: #303133;
      }

      .goods-trade {
        flex: 1;
        line-height: 18px;
        text-align: right;
        color: #b39999;
      }
    }
  }

  .total {
    text-align: right;
  }

  .actions {
    text-align: right;

    span {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      color: #383838;
      border: 0.5px solid #a8a8a8;
      font-size: 14px;
      padding: 0 15px;
      border-radius: 5px;
      margin-top: 10px;
    }
  }
}
</style>
