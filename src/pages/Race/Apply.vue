<template lang="html">
  <div class="apply">
    <race-item tip="截止报名" bgc="rgb(246,70,72)" :race="race"></race-item>
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
    this.axios.post('http://yulejia.pnnnc.com/api/race ')
      .then(res => {
        if (res.data.code === 1) {
          this.race = res.data.data.data
        }
      })
  }
}
</script>

<style lang="css" scoped>
.apply {
  margin-top: 1.31481481rem;
}
</style>
