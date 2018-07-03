<template lang="html">
  <div class="store">
    开发中...
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('changeTabbarActive', 1)
  }
}
</script>

<style lang="css" scoped>
.store {
  font-size: 24px;
  color: #199df8;
  margin-top: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
