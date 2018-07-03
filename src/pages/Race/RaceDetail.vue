<template lang="html">
  <div class="racedetail header-item">
    <div class="mask_div" v-show="mask" @click="hidden" @touchmove.prevent></div>
    <header-item title="赛事详情"></header-item>
    <transition name="slide-bottom">
      <div class="share" v-show="share">
          <div class="weixin sshare"><img src="static/images/weixin.png" alt="" class="weixin picc"><span>微信</span></div>
          <div class="firend sshare"><img src="static/images/friendzone.png" alt="" class="friend picc"><span>朋友圈</span></div>
          <div class="weibo sshare" @click="shareB"><img src="static/images/weibo.png" alt="" class="weibo picc"><span>微博</span></div>
          <div class="qq sshare" @click="shareQ"><img src="static/images/qq.png" alt="" class="qq picc"><span class="qq_right">QQ</span></div>
          <div class="qqzone sshare" @click="shareZ"><img src="static/images/qqzone.png" alt="" class="qqz picc"><span class="zone">QQ空间</span></div>
        </div>
    </transition>
    <img src="static/images/share.png" @click="Share">
    <img @click="star" :src="collected ? 'static/images/stared.png' : 'static/images/star.png' " class="star">
    <div class="banner1">
      <mt-swipe :auto="8000" :speed="1000">
        <mt-swipe-item  v-for="item in race.photo" :key="item">
          <img v-lazy="'http://yulejia.pnnnc.com/uploads/images/' + item">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="information">
      <div class="title" v-html="race.title">
      </div>
      <div class="content">
        <div class="race">
          <div class="time">
            <p><span>比赛时间：</span>{{race.race_begin}} - {{race.race_end}}</p>
          </div>
          <div class="grade">
            <p><span>赛级：</span>{{race.type}}</p>
          </div>
        </div>
        <div class="apply">
          <div class="time">
            <p><span>报名时间：</span>{{race.sign_begin}} - {{race.sign_end}}</p>
          </div>
          <button class="tip">
            {{race.expired}}截止报名
          </button>
        </div>
      </div>
    </div>
    <div class="contact bb">
      <!-- <a :href="race.url" @click.stop> -->
        <div class="location flex-item bb-item" @click="goUrl(race.url)">
          <img src="static/images/ylocal.jpg">
          <p>{{race.address}}</p>
          <i class="right"></i>
        </div>
      <!-- </a> -->
      <div class="tel flex-item" @click="callphone(race.tel)">
        <img src="static/images/ytel.png">
        <p>{{race.tel}}</p>
        <i class="right"></i>
      </div>
    </div>
    <div class="bb">
      <div class="bb-item">
        <!-- <router-link to="/description"> -->
          <div class="desc flex-item" @click="toggleDesc">
            <p>比赛说明</p>
            <i class="right" :class="{active: isDescription}"></i>
          </div>
          <description v-show="isDescription"></description>
        <!-- </router-link> -->
      </div>
      <div class="bb-item" @click="toggleAward">
        <div class="reward flex-item">
          <p>比赛奖励</p>
          <i class="right"></i>
        </div>
        <p v-show="isAward" style="padding:.5rem;">{{race.bonus}}</p>
      </div>      
    </div>
    <mu-list>
      <comment-item :comments="comments" :cateid="cateid" :objid="objid"></comment-item>
    </mu-list>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    <div class="footer">
      <!-- <router-link to="/comment"> -->
        <div class="sendcomment" @click="goComment(objid, cateid)">
          发表评论
        </div>
      <!-- </router-link> -->
      <!-- <router-link to="/personapply"> -->
        <div class="applyrace">
          报名比赛
        </div>
      <!-- </router-link> -->
    </div>
  </div>
</template>

<script>
import Description from './Description'
export default {
  components: {
    'description': Description
  },
  data() {
    return {
      isClicked: false,
      race: {},
      comments: [],
      share: false,
      mask: false,
      isDescription: false,
      isAward: false,
      cateid: null,
      objid: null,
      collected: null,
      collectCateid: null,
      scroller: null,
      loading: false,
      page: 1,
      pagesize: 10,
      list: '渔乐家',
      lists: '渔乐家' + window.location.href,
      url: window.location.href
    }
  },
  methods: {
        shareB () {
      var sharesinastring = 'http://service.weibo.com/share/share.php?title=' + this.lists + '&url=' + this.url + '&site="满艺网"';
        window.location.href = sharesinastring;
    },
    shareZ () {
      var sharesinastring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' + this.list + '&url=' + this.url + '&site="满艺网"';
        window.location.href = sharesinastring;
    },
    shareQ () {
      //分享到新浪微博
      var sharesinastring = 'http://connect.qq.com/widget/shareqq/index.html?title=' + this.list + '&summary=' + this.url + '&url=' + this.url + '&site="满艺网"';
        window.location.href = sharesinastring;
        function shareQQweibo() {
            var p = {
            url: location.href, /*获取URL，可加上来自分享到QQ标识，方便统计*/
            title: '分享小月亮', /*分享标题(可选)*/
            pic: '', /*分享图片(可选)*/
            site: 'QQ分享' /*分享来源(可选) 如：QQ分享*/
            }
          }
  },

    loadMore () {
      const totalNum = this.comments.count
      const pageNum = Math.floor(totalNum / this.pagesize) + 1
      console.log(pageNum)
      if (this.page < pageNum) {
        this.loading = true
        setTimeout(() => {
          this.page++
          let param = new URLSearchParams()
          param.append('objid', this.objid)
          param.append('cate_id', this.cateid)
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
    },
    star () {
      let param = new URLSearchParams()
      param.append('action', 'add')
      param.append('objid', this.objid)
      param.append('cate_id', this.collectCateid)
      this.axios.post('http://yulejia.pnnnc.com/api/focus', param)
        .then(res => {
          if (res.data.code === 0) {
            this.$router.push('/login')
          }
          if (res.data.code === 1) {
            this.collected = true
          }
          if (res.data.code === 2) {
            this.collected = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    goComment(objid, cateid) {
      this.$router.push({
        name: 'comment', params: { objid: objid, cateid: cateid }
      })
    },
    callphone(tel) {
      window.location.href = "tel:" + tel
    },
    goUrl(url) {
      window.location.href = url
    },
    toggleShow (item) {
      item = !item
    },
    toggleDesc() {
      this.isDescription = !this.isDescription
    },
    toggleAward() {
      this.isAward = !this.isAward
    },
    Share() {
      this.share = !this.share
      this.mask = !this.mask
      document.removeEventListener("touchmove", function (e) {
        e.preventDefault()
      }, false)
    },
    hidden() {
      this.share = false
      this.mask = false
    }
  },
  mounted() {
    this.scroller = this.$el
    let id = this.$route.params.id
    let param = new URLSearchParams()
    param.append('id', id)
    this.axios.post('http://yulejia.pnnnc.com/api/race', param)
      .then(res => {
        if (res.data.code === 1) {
          this.race = res.data.data.data
          this.collected = res.data.data.data.collect.collect
          this.collectCateid = res.data.data.data.collect.id
          this.objid = res.data.data.data.id
          this.cateid = res.data.data.data.comments[0].id
          console.log(this.race)
        }
      })
      .then(res => {
        let param1 = new URLSearchParams()
        param1.append('objid', this.objid)
        param1.append('cate_id', this.cateid)
        this.axios.post('http://yulejia.pnnnc.com/api/comments', param1)
          .then(res => {
            if (res.data.code === 1) {
              this.comments = res.data.data
            }
          })
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="css" scoped>
.mask_div {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter: alpha(Opacity=60);
  -moz-opacity: 0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 99;
}

.slide-bottom-enter-active {
  transition: all .3s ease;
}

.slide-bottom-leave-active {
  transition: all .25s ease-out;
}

.slide-bottom-enter,
.slide-bottom-leave-active {
  transform: translateY(-180px);
  opacity: 0;
}

.share {
  padding-left: .2rem;
  padding-right: .2rem;
  padding-top: 1.55185185rem;
  padding-bottom: .2rem;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
}

.sshare {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.picc {
  width: 1.2rem;
  height: 1.2rem;
  flex: 2;
}

span {
  flex: 1;
  margin-top: .1rem;
  padding-left: .15rem;
  letter-spacing: .03rem;
}

.qq_right {
  padding-left: .25rem;
}

.racedetail {
  margin-bottom: 1.5rem;
}

.banner1 {
  width: 100%;
  height: 6.01851852rem;
}

.banner1 img {
  width: 100%;
  height: 100%;
  float: left;
}

.racedetail>img {
  width: .5rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: .4rem;
}

.racedetail .star {
  width: .6rem;
  height: .5rem;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  top: .4rem;
  right: 1.4rem;
}

.racedetail .information {
  padding: .462962963rem .4166666667rem;
  border-bottom: .277777778rem solid #f0f0f0;
}

.racedetail .information .title {
  font-size: 16px;
  line-height: 30px;
  margin-bottom: .925925926rem;
}


/*.racedetail .information .content {
  font-size: 14px;
}*/

.racedetail .information span {
  color: #898989;
}

.racedetail .race {
  margin-bottom: .44444444rem;
}

.racedetail .time {
  float: left;
}

.racedetail .grade {
  float: right;
}

.racedetail .tip {
  float: right;
  padding: .1rem .240740741rem;
  background-color: #fff;
  border: 1px solid rgb(246, 70, 72);
  border-radius: 3px;
  font-size: 12px;
  color: rgb(246, 70, 72);
}

.racedetail .flex-item {
  padding: 0 .4166666667rem;
  height: 1.277777778rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  /*border-bottom: 1px solid #f0f0f0;*/
}

.racedetail .bb-item {
  border-bottom: 1px solid #f0f0f0;
}

.racedetail .flex-item img {
  height: .37037037rem;
  width: .37037037rem;
  margin-right: .277777778rem;
}

.racedetail .flex-item p {
  white-space: nowrap;
  flex: 1;
  font-size: 14px;
}

.racedetail .right {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
  /*margin-right: .3977777778rem;*/
}

.racedetail .bb {
  border-bottom: .277777778rem solid #f0f0f0;
}

.racedetail .footer {
  height: 1.33333333rem;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  color: #fff;
}

.racedetail .footer div {
  float: left;
  width: 50%;
  text-align: center;
  line-height: 1.33333333rem;
  font-size: 14px;
  color: #fff;
}

.racedetail .footer div.sendcomment {
  background-color: rgb(243, 152, 0);
}

.racedetail .footer div.applyrace {
  background-color: rgb(246, 70, 72);
}
</style>
