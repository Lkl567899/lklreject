<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="LoginBox">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input type="text" maxlength="11" class="inp" placeholder="请输入手机号" v-model="phoneCode">
        </div>
        <div class="form-item">
          <input type="text" maxlength="5" class="inp" placeholder="请输入图形验证码" v-model="picCode">
          <img :src="picUrl" v-if="picUrl" alt="" @click="GetPicCodeData" />
        </div>
        <div class="form-item">
          <input type="text" maxlength="11" class="inp" placeholder="请输入短信验证码" v-model="msgCode">
          <button @click="getphonecode">{{ cound === counds ? "获取验证码" : `${cound}秒后从新发送` }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="goLogin">登录</div>
    </div>
  </div>
</template>

<script>
import { GetPicCode, PostPassportLoginAPI, PostphoneMsgCodeAPI } from '@/api/login';
export default {
  data() {
    return {
      picCode: '',//用户输入的图形验证码
      picKey: '',//请求传递的图形验证码唯一标识
      picUrl: '',//存储渲染的图片地址
      phoneCode: '',//用户输入的手机号
      msgCode: '',//用户输入的短信验证码
      cound: 60, //倒计时
      counds: 60,//初始时间
      timer: null//定时器
    }
  },
  created() {
    this.GetPicCodeData()
  },
  methods: {
    //获取图形验证码
    async GetPicCodeData() {
      const res = await GetPicCode();
      this.picUrl = res.data.base64
      this.picKey = res.data.key
    },
    //获取短信验证码
    async getphonecode() {
      if (!this.validFn()) {
        return
      } else {
        if (!this.timer && this.cound === this.counds) {
          //发请求获取短信验证码
          await PostphoneMsgCodeAPI(this.picCode, this.picKey, this.phoneCode)
          this.$toast('验证码发送成功')
          //倒计时
          this.timer = setInterval(() => {
            console.log('定时器开始');
            this.cound--
            if (this.cound <= 0) {
              clearInterval(this.timer)
              this.timer = null
              this.cound = this.counds //重置时间

            }
          }, 1000)
        }
      }
      console.log(123);
    },
    // 校验输入框内容
    validFn() {
      if (!/^1[3-9]\d{9}$/.test(this.phoneCode)) {
        this.$toast("请输入正确的手机号");
        return false;
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast("请输入正确的图形验证码");
        return false;
      }
      return true;
    },
    //去登录
    async goLogin() {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await PostPassportLoginAPI(this.phoneCode, this.msgCode)
      //将token等信息存入到vuex
      this.$store.commit('user/setUserinfo', res.data)
      this.$toast('登录成功')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url, () => { }, () => { })

    }

  }
}
</script>

<style lang="less"  scoped>

.LoginBox {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;

    h3 {
      font-size: 26px;
      font-weight: normal;
    }

    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;

    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;

    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
  }
}
</style>
