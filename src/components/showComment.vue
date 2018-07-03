<template lang="html">
  <div class="showcomment">
    <mu-list>
      <comment-item :comments="comments" :objid="this.$route.params.objid"
      :cateid="this.$route.params.cateid" :isFishField="true"></comment-item>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      comments: [],
      scroller: null,
      loading: false,
      page: 1,
      pagesize: 10
    }
  },
  methods: {
    loadMore () {
      const totalNum = this.comments.count
      const pageNum = Math.floor(totalNum / this.pagesize) + 1
      console.log(pageNum)
      if (this.page < pageNum) {
        this.loading = true
        setTimeout(() => {
          this.page++
          let param = new URLSearchParams()
          param.append('objid', this.$route.params.objid)
          param.append('cate_id', this.$route.params.cateid)
          param.append('page', this.page)
          param.append('pagesize', this.pagesize)
          this.axios.post('http://yulejia.pnnnc.com/api/comments', param)
            .then(res => {
              if (res.data.code === 1) {
                res.data.data.data.forEach(data => {
                  this.comments.data.push(data)
                })
              }
            })
            .catch(e => {
              console.log(e)
            })
          this.loading = false
        }, 2000)
      }
    }
  },
  computed: {
    cateid () {
      return this.$route.params.cateid
    }
  },
  watch: {
    cateid: function () {
      let param = new URLSearchParams()
      this.scroller = this.$el
      this.page = 1
      param.append('objid', this.$route.params.objid)
      param.append('cate_id', this.$route.params.cateid)
      this.axios.post('http://yulejia.pnnnc.com/api/comments', param)
        .then(res => {
          if (res.data.code === 1) {
            this.comments = res.data.data
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.scroller = this.$el
    this.page = 1
    let param = new URLSearchParams()
    param.append('objid', this.$route.params.objid)
    param.append('cate_id', this.$route.params.cateid)
    this.axios.post('http://yulejia.pnnnc.com/api/comments', param)
      .then(res => {
        if (res.data.code === 1) {
          this.comments = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.showcomment {
  margin-bottom: 1.2rem;    
}
</style>
