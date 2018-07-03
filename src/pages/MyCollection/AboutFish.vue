<template lang="html">
  <div class="aboutfish">
    <aboutfish-item :datas="datas"></aboutfish-item>
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
    param.append('type', 'collect_yuediao')
    this.axios.post('http://yulejia.pnnnc.com/api/user', param)
    .then(res => {
      console.log(res.data.data.data)
      this.datas = res.data.data.data
    })
  }
}
</script>

<style lang="css">
</style>
