<template lang="html">
  <div class="apply allbg">
    <div class="parise_list">
      <div class="parise_list-item" v-for="item in datas" :key="item.id">
        <div class="title">
          <img v-lazy="'http://yulejia.pnnnc.com/uploads/images/'+item.headimg" 
          v-if="toString(item.headimg).indexOf('http') === -1">
          <img v-lazy="item.headimg" v-else>
          <div>
            <p class="nick">{{item.nickname}}</p>
            <p class="time">{{item.create_time}}</p>
          </div>
        </div>
        <p class="tip">
          走起走起走起走起走
        </p>
        <div class="intro" v-html="item.content">
        </div>
        <span class="lz">
          楼主
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datas: []
    }
  },
  mounted () {
    let param = new URLSearchParams()
    param.append('type', 'myjoin_yuediao_assign')
    this.axios.post('http://yulejia.pnnnc.com/api/user', param)
      .then(res => {
        this.datas = res.data.data
        console.log(this.datas)
      })
  }
}
</script>

<style lang="css" scoped>
.lz {
  color: #119df8;
  position: absolute;
  top: .3rem;
  right: .3rem;
  font-size: 14px;
}
.apply {
  margin-top: 1.6rem;
}
.parise_list-item {
  position: relative;
  padding: .277777778rem .425925926rem;
  background-color: #fff;
}
.parise_list-item .title {
  height: 1.2962963rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
}
.parise_list-item .title img {
  height: 1.2962963rem;
  width: 1.2962963rem;
  border-radius: 50%;
  margin-right: .277777778rem;
}
.parise_list-item .title p {
  line-height: .648148148rem;
}
.parise_list-item .nick {
  font-size: 14px;
}
.parise_list-item .time {
  font-size: 12px;
  color: #898989;
}
.parise_list-item .tip {
  margin-top: .277777778rem;
  font-size: 14px;
}
.parise_list-item .tip img {
  height: 14px;
  width: 14px;
  margin-right: .12962963rem;
}
.parise_list-item .intro {
  margin-top: .277777778rem;
  background-color: #f0f0f0;
  padding: .277777778rem .462962963rem;
  font-size: 14px;
}
</style>
