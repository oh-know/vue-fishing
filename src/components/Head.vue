<template lang="html">
  <div class="head">
    <header class="header">
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_393126_j2mkuwprvzir7ldi.css">
      <router-link to="/city">
        <div class="city-position">
          <div v-if="this.$store.state.selectCity.selectCity !== ''">{{selectCity}}</div>
          <div v-else>{{localCity}}</div>
          <img src="static/images/down.jpg"></img>
          <i></i>
        </div>
      </router-link>
      <div class="search">
        <router-link to="/start">
          <img src="static/images/search.jpg"></img>
          <input type="search" placeholder="老丁钓场">
        </router-link>
      </div>
      <div class="weather" @click="weather">
        <div class="text">
          <p class="tq">{{wethe[0].type}}</p>
          <p class="ds">{{wethe[0].high.substring(2)}}</p>
        </div>
        <i v-if="wethe[0].type == '多云'" class="iconfont icon-duoyun"></i>
        <i v-else-if="wethe[0].type == '晴转多云'" class="iconfont icon-duoyunzhuanyin"></i>
        <i v-else-if="wethe[0].type == '中雨'" class="iconfont icon-zhongyu"></i>
        <i v-else-if="wethe[0].type == '小雨'" class="iconfont icon-xiaoyu"></i>
        <i v-else-if="wethe[0].type == '晴'" class="iconfont icon-qingtian"></i>
        <i v-else-if="wethe[0].type == '雷阵雨'" class="iconfont icon-leizhenyu"></i>
        <i v-else class="iconfont icon-dayu"></i>
      </div>
    </header>
        <div id="allmap"></div>
  </div>
</template>

<script>
import { MP } from '@/library/map'
export default {
  data() {
    return {
      wethe: []
    }
  },
  computed: {
    localCity() {
      return this.$store.state.selectCity.localCity
    },
    selectCity() {
      return this.$store.state.selectCity.selectCity
    }
  },
  methods: {
    weather () {
      this.$router.push('/weather')
    }
  },
  mounted() {
    let param = new URLSearchParams()
    param.append('city', this.selectCity)
    param.append('is_tui', true)
    this.axios.post('http://yulejia.pnnnc.com/api/getfishing', param)
    .then(res => {
      this.wethe = JSON.parse(res.data.data.wether).data.forecast
      // console.log(this.wethe);
    })

    this.axios.post('http://yulejia.pnnnc.com/api/local')
    .then(res => {
      console.log(res.data)
      this.$store.commit('cityN', res.data)
    })
  }
}
</script>

<style lang="css" scoped>
.iconfont {
  font-family: 'iconfont';
  font-size: 20px;
}

.header {
  height: 1.31481481rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #119df8;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  padding: 0 .388888889rem;
  overflow: hidden;
  align-items: center;
}

.header .city-position {
  width: 2.21851852rem;
  font-size: 15.27px;
  color: #fff;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
}

.header .city-position img {
  width: .37037037rem;
  height: .37037037rem;
  margin-bottom: -.07rem;
}

.weather {
  display: flex;
  align-items: center;
  margin-left: .6rem;
  height: 100%;
  /*padding-right: 10px;*/
  /*width: 1.38888889rem;*/
  text-align: right;
  color: #fff;
  font-size: 15.27px;
}

.weather .text {
  font-size: 12px;
  color: #fff;
}

.weather .iconfont {}

.weather img {
  width: 1.18518519rem;
  height: .555555556rem;
}

.header .search {
  height: 0.851851852rem;
  flex: 1;
  position: relative;
  margin-left: .3rem;
}

.header .search img {
  position: absolute;
  width: .425925926rem;
  height: .425925926rem;
  left: .37037037rem;
  top: .25rem;
}

.header .search input {
  width: 100%;
  height: 100%;
  border-radius: 0.851851852rem;
  border: 0;
  outline: 0;
  padding-left: .925925926rem;
  font-size: 12px;
}
</style>
