<template>
  <div class="pay">
    <van-nav-bar title="订单结算台" left-arrow @click-left="$router.go(-1)" fixed />
    <div class="flow-delivery" @click="goAddress">
      <div class="left-icon">
        <van-icon name="logistics" />
      </div>
      <!-- 地址 -->
      <div class="info" v-if="defaultItem">
        <div class="info-content">
          <span class="name">{{ defaultItem.name }}</span>
          <span class="mobile">{{ defaultItem.phone }}</span>
        </div>
        <div class="info-address">{{ this.city }}{{ defaultItem.detail }}</div>
      </div>
      <div v-else>
        请选择收货地址
      </div>
      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="pay-list">
      <div class="list">
        <div class="goods-item" v-for="item in order.goodsList" :key="item.goods_id">
          <div class="left">
            <img :src="item.goods_image" alt="">
          </div>
          <div class="right">
            <p class="tit text-ellipsis-2">
              {{ item.goods_name }}
            </p>
            <p class="info">
              <span class="count">x{{ item.total_num }}</span>
              <span class="price">¥{{ item.goods_price_min }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flow-num-box">
        <span>共 {{ order.orderTotalNum }} 件商品，合计：</span>
        <span class="money">￥{{ order.orderTotalPrice }}</span>
      </div>
      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">¥{{ order.orderTotalPrice }}</span>
        </div>
        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>
        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="false">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>
      <div class="pay-way">
        <span class="tit">支付方式</span>
        <div class="pay-cell">
          <span><van-icon name="balance-o" />余额支付（可用 ¥
            {{ personal.balance }} 元）</span>
          <!-- <span>请先选择配送地址</span> -->
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>
      <div class="buytips">
        <textarea v-model="remark" placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>
    <div class="footer-fixed">
      <div class="left">
        实付款：<span>￥{{ order.orderTotalPrice }}</span>
      </div>
      <div class="tipsbtn" @click="gosubmit">提交订单</div>
    </div>
  </div>
</template>

<script>
import { GetCheckoutOrderAPI, PostCheckoutSubmitAPI } from '@/api/order'
export default {
  data() {
    return {
      //默认收货地址
      order: {},
      personal: {},
      defaultItem: {},
      city: '',
      remark: ''
    };
  },
  computed: {
    mode() {
      return this.$route.query.mode
    },
    cartIds() {
      return this.$route.query.cartIds
    },
    goodsId() {
      return this.$route.query.goodsId
    },
    goodsSkuId() {
      return this.$route.query.goodsSkuId
    },
    goodsNum() {
      return this.$route.query.goodsNum
    }
  },
  created() {
    this.GetCheckoutOrderData()
  },
  methods: {
    //跳转到地址列表页
    goAddress() {
      this.$router.replace({
        path: "/Address",
        query: {
          back: this.$route.fullPath,
        },
      });
    },
    //订单提交
    async GetCheckoutOrderData() {
      if (this.mode === 'cart') {
        const res = await GetCheckoutOrderAPI(this.mode, {
          cartIds: this.cartIds
        })
        this.order = res.data.order
        this.defaultItem = res.data.order.address
        this.personal = res.data.personal
        this.city = this.defaultItem.region.city + this.defaultItem.region.province + this.defaultItem.region.region

      } else {
        const res = await GetCheckoutOrderAPI(this.mode, {
          goodsId: this.goodsId,
          goodsSkuId: this.goodsSkuId,
          goodsNum: this.goodsNum
        })
        this.order = res.data.order
        this.defaultItem = res.data.order.address
        this.personal = res.data.personal
        this.city = this.defaultItem.region.city + this.defaultItem.region.province + this.defaultItem.region.region

      }


    },
    //提交
    async gosubmit() {
      if (this.mode === 'cart') {
        await PostCheckoutSubmitAPI(this.mode,{
          cartIds:this.cartIds,
          remark:this.remark
        })
      }else{
        await PostCheckoutSubmitAPI(this.mode,{
          goodsId:this.goodsId,
          goodsNum:this.goodsNum,
          goodsSkuId:this.goodsSkuId,
          remark:this.remark
        })
      }
      this.$toast.success('支付成功')
      this.$router.replace('/myorder')
    }
  }
}
</script>

<style lang="less" scoped>
.pay {
  margin-top: 46px;

  .flow-delivery {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 25px 22px;
    font-size: 14px;
    color: #666;
    position: relative;
    background: url(@/assets/leina.avif) bottom repeat-x;
    background-color: white;
    background-size: 60px auto;

    .left-icon {
      margin-right: 20px;
    }

    .right-icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-7px);
    }
  }

  .goods-item {
    height: 100px;
    padding: 10px;
    background-color: #fff;
    display: flex;

    .left {
      width: 100px;

      img {
        display: block;
        width: 80px;
        margin: 10px auto;
      }
    }

    .right {
      flex: 1;
      font-size: 14px;
      line-height: 1.3;
      padding: 10px;
      padding-right: 0px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      color: #333;

      .info {
        margin-top: 5px;
        display: flex;
        justify-content: space-between;

        .price {
          color: #fa2209;
        }
      }
    }
  }

  .flow-num-box {
    display: flex;
    justify-content: flex-end;
    padding: 10px 10px;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
    background-color: white;

    .money {
      color: #fa2209;
    }
  }

  .pay-detail {
    margin-top: 18px;
    background-color: white;

    .pay-cell {
      font-size: 14px;
      padding: 10px 12px;
      color: #333;
      display: flex;
      justify-content: space-between;
      border-bottom: #efefef 1px solid;

      .red {
        color: #fa2209;
      }
    }
  }

  .pay-way {
    font-size: 14px;
    padding: 10px 12px;

    background-color: white;
    color: #333;

    .pay-cell {
      font-size: 14px;
      padding: 10px 12px;
      color: #333;
      display: flex;
      justify-content: space-between;
      border-bottom: #efefef 1px solid;

      .red {
        color: #fa2209;
      }
    }

    .tit {
      line-height: 30px;
    }

    .pay-cell {
      padding: 10px 0;
    }

    .van-icon {
      font-size: 20px;
      margin-right: 5px;
    }
  }

  .buytips {
    display: block;

    textarea {
      display: block;
      width: 100%;
      border: none;
      font-size: 14px;
      padding: 12px;
      height: 100px;
    }
  }

  .footer-fixed {
    z-index: 100;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    height: 68px;
    line-height: 68px;
    border-top: 1px solid #efefef;
    font-size: 14px;
    display: flex;

    .left {
      flex: 1;
      padding-left: 12px;
      color: #666;

      span {
        color: #fa2209;
      }
    }

    .tipsbtn {
      width: 121px;
      background: linear-gradient(90deg, #f9211c, #ff6335);
      color: #fff;
      text-align: center;
      line-height: 68px;
      display: block;
      font-size: 14px;
    }
  }
}
</style>
