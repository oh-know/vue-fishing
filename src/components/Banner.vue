<template lang="html">
  <div class="banner">
    <mt-swipe :auto="8000" :speed="1000">
      <mt-swipe-item v-for="data in banners" key="data.id">
        <a :href="data.url"><img v-lazy="data.photo"></a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      // banners: [
      //   { id: 0, src: 'static/images/recommend.png' },
      //   { id: 1, src: 'static/images/recommend.png' },
      //   { id: 2, src: 'static/images/recommend.png' }
      // ]
      banners: []
    }
  },
  mounted () {
    let param = new URLSearchParams()
    param.append('type', 'banner')
    this.axios.post('http://yulejia.pnnnc.com/api/getinfo', param)
      .then(res => {
        if (res.data.code === 1) {
          console.log(res);
          let head = 'http://yulejia.pnnnc.com/uploads/images/'
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].photo = head + res.data.data[i].photo
          }
          this.banners = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
@import '../assets/style/banner.css';
</style>
