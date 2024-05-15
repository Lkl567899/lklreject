<template>
  <div class="Address">
    <van-nav-bar title="收货地址" fixed left-arrow @click-left="$router.go(-1)" />
    <div class="addressli">
      <div class="address-item">
        <div class="item" v-for="item in List" :key="item.address_id">
          <div class="contacts">
            <span class="name">{{ item.name }}</span><span>{{ item.phone }}</span>
          </div>
          <div class="address">
            <span class="region">{{ item.region.city }}</span><span class="region">{{ item.region.province
              }}</span><span class="region">{{ item.region.region }}</span><span>{{ item.detail }}</span>
          </div>
          <div class="line"></div>
          <div class="item-option">
            <div class="left">
              <van-radio-group v-model="radio">
                <van-radio :name="item.address_id" checked-color="#ee0a24" @click="setRadio(item)">{{ radio ===
      item.address_id ? '默认' : '选择' }}</van-radio>
              </van-radio-group>
            </div>
            <div class="right">
              <div class="edit" @click="goAddressForm(item.address_id)">编辑</div>
              <div @click="delAddress(item.address_id)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="btn" @click="goAddressForm()">
        <div class="redBTN">新建地址</div>
      </div>

    </div>
  </div>
</template>
<script>
import { getaddressList, postLastAddressId, getDefaultId, delAddressItem } from '@/api/address'
import { Toast } from "vant";
export default {
  data() {
    return {
      radio: 0,
      List: []
    }
  },
  created() {
    this.getaddressListData()
    // this.getDefaultIdData()
  },
  mounted(){
    document.body.style.backgroundColor="#ffffff";

  },
  computed: {
    url() {
      return this.$route.query.back
    }
  },
  methods: {
    //获取收货地址列表
    async getaddressListData() {
      const res = await getaddressList()
      this.List = res.data.list
      console.log(res.data.list);
      if (this.List) {
        this.getDefaultIdData()
      }
    },
    //获取默认收货地址id
    async getDefaultIdData() {
      const res = await getDefaultId()
      this.radio = res.data.defaultId
      let obj = {}
      //置顶 遍历出默认收货项 先删除 再添加
      this.List.forEach((item, index) => {
        if (item.address_id === this.radio) {
          obj = item
          this.List.splice(index, 1)
          return
        }
      })
      this.List.unshift(obj)


    },
    //设置为默认地址
    async setRadio(item) {
      //检测是否是订单页来的 是的话再跳回订单页
      if (this.url) {
        await postLastAddressId(item.address_id)
        this.$router.replace(this.url)

      }
      await postLastAddressId(item.address_id)
      Toast.success('设置成功')
      this.getaddressListData()
    },
    //去到编辑/新建页
    goAddressForm(id) {
      if (id) {
        this.$router.push(`/Addressfrom?id=${id}`)
      } else {
        this.$router.push(`/Addressfrom`)
      }

    },
    //删除地址
    delAddress(id) {
      this.$dialog.confirm({
        title: '提示',
        message: '您确定要删除当前收货地址吗？',
      })
        .then(async () => {
          await delAddressItem(id)
          this.$toast('删除成功')
          this.getaddressListData()
        })
        .catch(() => {

        });
    }
  }
}
</script>

<style lang="less">
.Address {
  padding-top: 46px;

  .address-item {
    padding-bottom: 60px;


    .item {
      background-color: white;
      border: 1px solid #f3f3f3;
      border-radius: 8px;
      margin: 14px;
      padding: 22px 29px;

      .contacts {
        font-size: 16px;
        margin-bottom: 11px;

        .name {
          margin-right: 5px;
        }
      }

      .address {
        .region {
          margin-right: 3px;
        }
      }

      .line {
        margin: 14px 0;
        border-bottom: 1px solid #f3f3f3;
      }

      .item-option {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right {
          display: flex;
          align-items: center;
          line-height: 35px;

          .edit {
            margin-right: 20px;
          }
        }
      }

    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: white;
    border-bottom: 1px solid #f3f3f3;

    .btn {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 0 21px;
    }

    .redBTN {
      flex: 1;
      font-size: 14px;
      height: 42px;
      line-height: 42px;
      text-align: center;
      color: #fff;
      border-radius: 26px;
      background: linear-gradient(90deg, #f9211c, #ff6335);
    }

  }
}
</style>
