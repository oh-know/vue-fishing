<template lang="html">
  <div class="login">
    <div class="page" style="background-image: url(static/images/login.png);background-size: cover;" >
      <div class="Login_content">
        <div class="login_button">
          <div class="button" @click="login">
            <img src="static/images/wechat.png">
            <p>微信一键登录</p>
          </div>
        </div>
        <div class="check">
          <div :class="{active: isActive}" @click="check" class="bd">
            <i v-show="isActive"></i>
          </div>
          <p><router-link to="/readInfo">已阅读并同意渔乐家《用户使用协议》</router-link></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      isActive: true
    }
  },
  mounted(){
     
  },
  created() {

  },
  methods: {
    check() {
      this.isActive = !this.isActive
      console.log(this.isActive)
    },
    login() {
      if (this.isActive == true) {
        if (window.settings) {
          // app内登陆
          try{
         //type 授权类型  1微信  2 QQ（暂只支持微信）
             window.settings.accreditlogin("1")
          }catch(e){

          }
        } else {
          // 微信内
          window.location.href = 'http://yulejia.pnnnc.com/api/wxlogin.html?jump=' + this.$route.query.redirect || '/main'
        }
      } else {
        Toast({
          message: '请阅读并同意用户使用协议',
          position: 'middle',
          duration: 2000
        })
      }
    },
    /***
    *
    参数说明：type 授权类型 openid 微信用户的唯一id  headimgurl 头像链接 nickname 昵称   sex 性别 city 城市 province 省份 unionid 用户在开放平台下唯一一个id
    ***/
    sharelogin(type,openid,headimgurl,nickname,sex,city,Province,unionid){
      document.getElementById("text1").innerText = "返回用户信息\n openid="+openid+"  nickname="+nickname;
    },
  }
}
</script>

<style lang="css" scoped>
.Login_content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login_button {
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 1rem;
}

.page {
  /*width: 100%;*/
  height: 100vh;
  /*display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  justify-content: center;*/
  padding: 0 10%;
}

.button {
  width: 100%;
  height: 1.33333333rem;
  border-radius: 1.33333333rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button img {
  width: .703703704rem;
  height: .574074074rem;
  margin-right: .277777778rem;
}

.button p {
  font-size: 16px;
  color: #119df8;
}

.check {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 2rem;
}

.check .bd {
  width: .55555556rem;
  height: .55555556rem;
  border: 1px solid #fff;
  border-radius: 50%;
  margin-right: .2rem;
  position: relative;
  float: left;
}

.check .bd.active {
  background-color: #119df8;
  border: 1px solid #119df8;
}

.check a {
  color: #fff;
  text-decoration: underline;
}

.check p {
  font-size: 14px;
  color: #fff;
  overflow: hidden;
  float: left;
}

.check i {
  width: .3rem;
  height: .15rem;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg);
  position: absolute;
  top: 25%;
  left: 25%;
  margin-left: -.075rem;
}
</style>
