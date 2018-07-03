<template lang="html">
  <div class="info header-item">
    <header-item title="我的资料" path="/my"></header-item>
    <div class="infolist">
      <router-link to="/editavatar">
        <div class="avatar_msg">
          <p>头像</p>
          <img :src="isClick ? 'static/images/0.gif' : avatar " v-if="avatar.indexOf('http')>=0">
          <img :src="'http://yulejia.pnnnc.com/uploads/images/'+avatar" v-else>
          <i></i>
        </div>
      </router-link>
      <router-link to="/editnick">
        <div class="cell-item">
          <p>昵称</p>
          <p>{{text}}</p>
          <i></i>
        </div>
      </router-link>
      <div class="cell-item" @click="show">
        <p>性别</p>
        <p>{{item}}</p>
        <i></i>
      </div>
      <div class="cell-item">
        <p>鱼龄</p>
        <p>{{num}}</p>
        <i></i>
      </div>
      <div class="mask" v-show="isShow" @click="hidden"></div>
      <div class="select" v-show="isShow">
        <div class="header">
          <div class="dl" @click="hidden">取消</div>
          <div class="dc">请选择性别</div>
          <div class="dr" @click="confirm">完成</div>
        </div>
        <div class="main">
          <div class="sex" @click="select($event)" v-show="isSelect">男</div>
          <!-- <div class="sex active">女</div> -->
          <div class="active sex" ref="sex">女</div>
          <div class="sex" @click="select($event)" v-show="!isSelect">女</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      item: '',
      isSelect: true,
      text: '',
      isClick: true,
      num: ''
    }
  },
  computed: {
    avatar() {
      return this.$store.state.touImg.avatar
    }
  },
  methods: {
    hidden () {
      this.isShow = false
    },
    show () {
      this.isShow = true
    },
    select (e) {
      this.isSelect = !this.isSelect
      this.$refs.sex.innerText = e.currentTarget.innerText
    },
    confirm () {
      this.hidden()
      this.item = this.$refs.sex.innerText
    }
  },
  mounted () {

    this.axios.post('http://yulejia.pnnnc.com/api/user')
      .then(res => {
        if (res.data.code === 1) {
          this.text = res.data.data.data.nickname
          this.$store.commit('selectAvatar', res.data.data.data.headimg)
          this.isClick = false
          this.num = '3年'
        } else {
          this.text = '请先登录'
          this.num = '请先登录'
        }
      })
  }
}
</script>

<style lang="css" scoped>
.infolist .main {
  padding: .6rem 0;
}
.infolist .sex {
  font-size: 16px;
  height: 1.259259259rem;
  text-align: center;
  line-height: 1.259259259rem;
  color: #898989;
  width: 100%;
  /*margin-bottom: 1.259259259rem;*/
}
.infolist .active {
  position: absolute;
  top: 3.2rem;
  border-top: 1px solid #dcdddd;
  border-bottom: 1px solid #dcdddd;
  color: #000;
}
.infolist .mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #000;
  opacity: .5;
  z-index: 999;
}
.infolist .select {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6.87037037rem;
  background-color: #fff;
  z-index: 9999;
}
.infolist .select .header {
  height: 1.33333333rem;
  border-bottom: 1px solid #dcdddd;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .46296296rem;
}
.infolist .select .dl, .dr {
  font-size: 14px;
}
.infolist .select .dl {
  color: #898989;
}
.infolist .select .dc {
  font-size: 16px;
  text-align: center;
  flex: 1;
  /*font-weight: bold;*/
}
.infolist .select .dr {
  color: #119df8;
}
.avatar_msg {
  height: 1.824074074rem;
  font-size: .44444444rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  padding: 0 .407407407rem;
}
.avatar_msg p {
  flex: 1;
}
.avatar_msg img {
  height: 1.2962963rem;
  width: 1.2962963rem;
  border-radius: 50%;
  margin-right: .285195185rem;
}
.infolist i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
}
.cell-item {
  padding: 0 .407407407rem;
  border-top: 1px solid #f0f0f0;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  font-size: .44444444rem;
  height: 1.27777778rem;
}
.cell-item p:first-child {
  flex: 1;
}
.cell-item p:not(:first-child) {
  margin-right: .285195185rem;
  color: #9b9b9c;
}
.infolist {
  margin-top: .277777778rem;
  background-color: #fff;
}
.info {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -999;
  background-color: #f0f0f0;
}
</style>
