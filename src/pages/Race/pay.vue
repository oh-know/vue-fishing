<template lang="html">
  <div class="pay">
    <header-item title="缴纳费用"></header-item>
    <div class="msg">
      <div class="msg_pic">
        <img :src="photo" alt="" class="pic">
      </div>
      <div class="msgmap">
        <div class="top">
          <label>{{this.$route.params.b}}</label>
          <label>{{this.$route.params.a}}</label>
        </div>
        <div class="bottom">
          {{showAddress}}
        </div>
      </div>
    </div>
    <div class="bar"></div>
    <div class="paykind">
      <div class="weixin_pay">
        <div class="weixin">
            <img src="static/images/weixinpay.jpg" alt="" class="weixin_img">
        </div>
        <span>微信支付</span>
        <div class="select">
          <div class="circle" @click="select('selct')" :class="{isSelect: Tab ==='selct'}">
            <div class="gou" v-show="yes"></div>
          </div>
        </div>
      </div>
      <div class="weixin_pay">
        <div class="weixin">
            <img src="static/images/zhifubao.jpg" alt="" class="weixin_img">
        </div>
        <span>支付宝</span>
        <div class="select">
          <div class="circle" @click="select('nselct')" :class="{isSelect: Tab ==='nselct'}">
            <div class="gou" v-show="yes"></div>
          </div>
        </div>
      </div>
      <div class="button" @click="pay()">确认支付  ￥200123123</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      yes: true,
      Tab: 'selct',
      text: this.$store.state.province,
      name: this.$route.params.a,
      tel: this.$route.params.b,
      price: 200,
      orderid: name+this.$route.params.b,
      notice_url: "yulejia.pnnnc.com/api/get_pay_mes",
      typeplay: 1, // 微信支付
    }
  },
  computed: {
    showAddress() {
      return this.$store.state.membership.province + this.$store.state.membership.city + this.$store.state.membership.district
    },
    photo() {
      return this.$store.state.membership.photo
    }
  },
  methods: {
    select (type) {
      this.Tab = type
    },
    pay () {
      if (window.settings) {
        alert('inside app')
        try{
          let postdata = {"title":this.name, "price":this.price, "orderid":this.orderid, "notice_url":this.notice_url, "typeplay":this.typeplay}
           window.settings.applypayData(postdata)

        }catch(e){

        }
      }else{
        alert("outside app")
      }
    }
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.pay {
  margin-top: 1.5rem;
  font-size: 15px;
  margin: 1.5rem .4rem 0 .4rem;
  margin-right: .4rem;
}
.msg {
  display: flex;
  margin-top: .15rem;
}
.msg_pic {
  flex: 1;
}
.msgmap {
  flex: 4;
  display: flex;
  flex-direction: column;
  font-size: 15px;
}
.pic {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.top {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.bottom {
  flex: 1;
}
label:nth-child(2) {
  opacity: .6;
}
.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
  margin-top: .15rem;
}
.paykind {
  width: 100%;
}
.weixin_pay {
  display: flex;
  border-bottom: 1px solid #F0F0F0;
  padding: .2rem 0;
}
.weixin {
  flex: .7;
}
span {
  flex: 4;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.select {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weixin_img {
  width: .8rem;
  border-radius: 4px;
}
.circle {
  width: .5rem;
  height: .5rem;
  border: 1px solid #F0F0F0;
  border-radius: 50%;
}
.button {
  width: 100%;
  height: 1.2rem;
  margin-top: .4rem;
  background-color: #E38C1A;
  border-radius: 4px;
  color: white;
  text-align: center;
  line-height: 1.2rem;
  font-size: 16px;
}
.isSelect {
  background-color: #119DF8;
  border: none;
}
.gou {
  width: .35rem;
  height: .2rem;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-top: .1rem;
  margin-left: .08rem;
}
</style>
