<template>
  <div class="address-form">
    <van-nav-bar :title="id ? '编辑收货地址' : '新增收货地址'" fixed left-arrow @click-left="$router.go(-1)" />
    <div class="form-title">收货地址</div>
    <van-form @submit="onSubmit" class="form">
      <van-field v-model="form.name" name="姓名" label="姓名" placeholder="请输入收货人姓名"
        :rules="[{ required: true, message: '请输入收货人姓名' }]" />
      <van-field v-model="form.phone" name="电话" label="电话" placeholder="请输入收货人手机号"
        :rules="[{ required: true, message: '请输入收货人手机号' }]" />
      <van-field @click="show = true" v-model="form.city" label="省市区" placeholder="请选择省市区"
        :rules="[{ required: true, message: '请选择省市区' }]"></van-field>
      <van-field v-model="form.detail" name="详细地址" label="详细地址" placeholder="详细地址"
        :rules="[{ required: true, message: '请填写详细地址' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 弹出层 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }">
      <van-area title="标题" :area-list="areaList" @confirm="setArea" @cancel="show = false" />
    </van-popup>
  </div>

</template>

<script>
import { getAddressDetailId, setAddressListId, addAddressListId } from '@/api/address'
import { areaList } from '@vant/area-data'
export default {
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  created() {
    if (this.id) {
      this.getAddressDetailIdData()
    }
  },
  data() {
    return {
      form: {
        name: '', //联系人
        phone: '', //电话号
        detail: '', //详细地址
        city: '', //城市
      },
      show: false,
      areaList,
      region: []
    };
  },
  methods: {
    //获取地址详情
    async getAddressDetailIdData() {
      const res = await getAddressDetailId(this.id)
      //前端显示地区 对象转数组保留对象值
      const arr = Object.values(res.data.detail.region)
      //数组转字符串
      this.form.city = arr.join(' ')
      //合并对象
      Object.assign(this.form, res.data.detail)
    },
    //城市选择器 点击确定后触发的事件
    setArea(v) {
      //城市前端显示
      const res = v.map(n => n.name)
      this.form.city = res.join(' ')
      //城市后端提交
      this.region = v.map((item) => ({
        value: Number(item.code),
        label: item.name

      }))
      this.show = false
    },
    //提交校验
    async onSubmit() {
      if (this.id) {
        //编辑
        const res = await setAddressListId(this.id, this.form.name, this.form.phone, this.region, this.form.detail)
        this.$toast('编辑成功')
      } else {
        //新建
        const res = await addAddressListId(this.form.name, this.form.phone, this.region, this.form.detail)
        this.$toast('添加成功')
      }
     setTimeout(() => {
      this.$router.go(-1)
     }, 400);



    }
  }
}
</script>

<style lang="less" scoped>
.address-form {
  padding-top: 46px;

  .form-title {
    width: 94%;
    margin: 0 auto;
    padding-top: 29px;
    font-size: 20px;
    color: rgba(69, 90, 100, .6);
  }

  .form {
    width: 94%;
    margin: 14px auto;
  }
}
</style>
