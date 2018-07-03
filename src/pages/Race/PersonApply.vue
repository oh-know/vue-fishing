<template lang="html">
  <div class="personapply header-item">
    <header-item title="个人赛事报名"></header-item>
    <div class="title">
      <div class="img">
        <img src="static/images/list01.jpg">
      </div>
      <div class="text">
        <p>围观iwbojdskkqasfksdkk但是vgkdsklnvdkdskvnskd</p>
        <p><span>比赛时间：</span>2017-06-03 - 06-20</p>
      </div>
    </div>
    <div class="information">
      <div class="user">
        <div class="block">
          <div class="item">
            <span>姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名</span>
            <input type="text">
          </div>
          <div class="item">
            <span>电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话</span>
            <input type="text">
          </div>
          <div class="item">
            <span>身份证号码</span>
            <input type="text">
          </div>
        </div>
        <div class="price item">
          <div>
            <p>共 1 人<span class="">费用：</span><span class="char">￥</span><span class="money">516.6</span></p>
          </div>
        </div>
      </div>
    </div>
    <div class="btn">
      <router-link to="/pay">
        <button>
          立即支付
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.personapply:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f0f0f0;
  z-index: -999;
}
.personapply .title {
  padding: .277777778rem .44444444rem;
  position: relative;
  border-bottom: .277777778rem solid #f0f0f0;
  background-color: #fff;
}
.personapply .title div {
  float: left;
}
.personapply .title .img {
  width: 2.73148148rem;
  height: 2.08333333rem;
  overflow: hidden;
  margin-right: .44444444rem;
}
.personapply .title img {
  width: 100%;
  height: 100%;
}
.personapply .text {
  width: 5.5rem;
  padding-top: .277777778rem;
  height: 1.8rem;
  position: relative;
}
.personapply .text p:first-child {
  font-size: 14px
}
.personapply .text p:last-child {
  position: absolute;
  bottom: 0;
}
.personapply .text p:last-child span {
  color: #898989;
}
.personapply .user {
  background-color: #fff;
}
.personapply .item {
  height: 1.277777778rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.personapply .block {
  padding: 0 .44444444rem;
}
.personapply .user div:not(:first-child) {
  border-top: 1px solid #f0f0f0;
}
.personapply .item span {
  width: 2.277777778rem;
}
.personapply .item input {
  color: #898989;
}
.personapply .price > div {
  position: absolute;
  right: .44444444rem;
}
.personapply .price span:first-child {
  margin-left: .44444444rem;
}
.personapply .price span {
  color: rgb(246,70,72);
}
.personapply .price .char {
  font-size: 12px;
  transform: scale(.5);
}
.personapply .price .money {
  font-size: 16px;
}
.personapply .btn {
  padding: 0 .44444444rem;
  margin-top: .740740741rem;
}
.personapply .btn button {
  width: 100%;
  height: 1.14285714rem;
  border: 0;
  background-color: rgb(243,152,0);
  color: #fff;
  /*border-radius: 5px;*/
}
</style>
