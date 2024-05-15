import request from "@/utils/request";
//获取图形验证码
export const GetPicCode = () => {
  return request.get("/captcha/image");
};
//获取手机验证码
export const PostphoneMsgCodeAPI = (captchaCode,captchaKey,mobile) => {
  return request.post("/captcha/sendSmsCaptcha", {
    form: {
      captchaCode,
      captchaKey,
      mobile,
    },
  });
};
//手机号登录
export const PostPassportLoginAPI = (mobile,smsCode) =>{
  return request.post('/passport/login',{
    form:{
      isParty:false,
      partyData:{},
      mobile, //手机号
      smsCode //短信验证码
    }
  })
}
