<template lang="html">
  <div class="myrace header-item allbg">
    <header-item title="我的赛事"></header-item>
    <race-item :race="race"></race-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      race: []
    }
  },
  mounted () {
    let param = new URLSearchParams()
    param.append('type', 'race')
    this.axios.post('http://yulejia.pnnnc.com/api/user', param)
    .then(res => {
      this.race = res.data.data.data
    })
  }
}
</script>

<style lang="css">
</style>