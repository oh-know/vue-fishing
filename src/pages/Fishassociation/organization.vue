<template lang="html">
  <div class="organization">
    <header-item title="江西省地方钓鱼协会" path="/fishassociation"></header-item>
    <div class="spread">
      <div class="spread_item" v-for="item in child" @click="details(item.id)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      child: []
    }
  },
  mounted () {
    let param = new URLSearchParams()
    param.append('cate_id', this.$route.params.id)
    this.axios.post('http://yulejia.pnnnc.com/api/diaoxie', param)
    .then(res => {
      this.child = res.data.data.child
    })
  },
  methods: {
    details (type) {
      this.$router.push({name: 'cityFishAssociation',params: {'id': type}})
      let param = new URLSearchParams()
      param.append('cate_id', this.$route.params.id)
      console.log(this.$route.params.id)
      this.axios.post('http://yulejia.pnnnc.com/api/diaoxie',param)
        .then(res => {
          this.message = res.data.data.diaoxie.description
          this.name = res.data.data.diaoxie.name
          this.member = res.data.data.numbers
          this.child = res.data.data.child
          this.server = res.data.data.server
          this.tel = res.data.data.server
          // console.log(res);
        })
    }
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}
.organization {
  margin-top: 1.5rem;
  font-size: 15px;
  margin: 1.5rem .4rem 0 .4rem;
}
.spread {
}
.spread_item {
  border: 1px solid rgba(0,0,0,0.1);
  width: 28%;
  display: inline-block;
  margin-top: .2rem;
  text-align: center;
  padding: .2rem .2rem;
  border-radius: 16px;
  color: #65ACF7;
}
.spread_item:nth-child(3n-2) {
}
.spread_item:nth-child(3n) {
}
.spread_item:nth-child(3n-1) {
  margin: 0 .71rem;
}
</style>
