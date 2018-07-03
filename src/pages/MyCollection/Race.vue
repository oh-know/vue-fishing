<template lang="html">
  <div class="race">
    <race-item tip="截止报名" bgc="rgb(246,70,72)" :race="race"></race-item>
    
    <!-- <race-item tip="查看成绩" bgc="rgb(243,152,0)" :race="score"></race-item> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      race: [],
      score: []
    }
  },
  mounted () {
    let param = new URLSearchParams()
    param.append('type', 'collect_race')
    this.axios.post('http://yulejia.pnnnc.com/api/user', param)
      .then(res => {
        this.race = res.data.data.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css">
</style>
