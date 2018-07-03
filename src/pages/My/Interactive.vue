<template lang="html">
  <div class="interactive">
    <router-link to="/attention">
      <div class="attention">
        <p class="num">{{focus}}</p>
        <p class="name">关注</p>
      </div>
    </router-link>
    <router-link to="/fans">
      <div class="fans">
        <p class="num">{{this.beFocused}}</p>
        <p class="name">粉丝</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      focus: '0',
      beFocused: '0'
    }
  },
  mounted() {
    this.axios.post('http://yulejia.pnnnc.com/api/user')
      .then(res => {
        if (res.data.code == 1) {
          this.focus = res.data.data.focus
          this.beFocused = res.data.data.befocus
        } else if(res.data.code == -1){
          this.focus = 0
          this.beFocused = 0
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="css" scoped>
.attention p:nth-child(1),
.fans p:nth-child(1) {
  margin-top: .2rem;
}

.interactive {
  height: 1.66666667rem;
  border-bottom: .296296296rem solid #f0f0f0;
  overflow: hidden;
}

.interactive div {
  height: 1.66666667rem;
  width: 49.5%;
  float: left;
  text-align: center;
}

.interactive div:last-child {
  border-left: 1px solid #f0f0f0;
}

.interactive .num {
  /*font-size: .428148148rem;*/
  font-size: 16px;
}

.interactive .name {
  /*font-size: .351851853rem;*/
  font-size: 14px;
  color: #898989;
}
</style>
