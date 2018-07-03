<template lang="html">
  <div class="recommend">
    <!--<mt-loadmore :bottom-method="loadBottom" :bottomPullText='bottomText'
                     ref="loadmore">-->
    <y-banner></y-banner>
    <!-- <v-touch v-on:swipeleft="onSwipeLeft"> -->
      <div class="related">
        <div v-for="item in datas" :key="item.id">
          <router-link :to="item.path">
            <img :src="item.src">
            <p>{{item.name}}</p>
          </router-link>
        </div>
      </div>
      <div class="headlines">
        <img src="static/images/headlines.png">
        <i class="point"></i>
        <!-- <transition name="slide-top"><a :href="this.$store.getters.url" class="topper">{{this.$store.getters.top}}</a></transition> -->
        <div class="topper">
          <!-- <mt-swipe :speed="2500" :prevent="false" :show-indicators="false">
            <mt-swipe-item>
              <a :href="url1">{{a}}</a>
            </mt-swipe-item>
            <mt-swipe-item>
              <a :href="url2">{{b}}</a>
            </mt-swipe-item>
          </mt-swipe> -->
          <div class="film_focus">
            <div class="film_focus_desc" style="display: none;">
              <h3>素材家园 - www.sucaijiayuan.com</h3>
              <ul class="film_focus_nav">
                <li class="cur"> <b>长标题1</b><span>短标题1</span> </li>
                <li> <b>长标题2</b><span>短标题2</span> </li>
                <li> <b>长标题3</b><span>短标题3</span> </li>
                <li> <b>长标题4</b><span>短标题4</span> </li>
                <li> <b>长标题5</b><span>短标题5</span> </li>
              </ul>
            </div>
            <div class="film_focus_imgs_wrap">
              <ul class="film_focus_imgs">
                <li><a target="_blank" :href="url1">{{a}}</a></li>
                <li><a target="_blank" :href="url2">{{b}}</a></li>
                <li><a target="_blank" :href="url3">{{c}}</a></li>
                <li><a target="_blank" :href="url4">{{d}}</a></li>
                <li><a target="_blank" :href="url5">{{e}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="list-head">
        <img src="static/images/where.png">
      </div>
    <!-- </v-touch> -->
    <y-list></y-list>
    <div class="more" @click="showmore">
      <p>查看更多 ></p>
    </div>
    <!--</mt-loadmore>-->
  </div>
</template>

<script>
  import Banner from '@/components/Banner.vue'
  import List from '@/components/List.vue'
  export default {
    data() {
      return {
        datas: [
          { id: 0, name: '钓协公告', src: 'static/images/01.png', path: '/fishannouncement' },
          { id: 1, name: '钓协会员', src: 'static/images/02.jpg', path: '/fishassociation' },
          { id: 2, name: '活动赛事', src: 'static/images/03.jpg', path: '/raceindex' }
        ],
        getScoreLog: [],
        pageNo: 1,
        allLoaded: false,
        bottomText: '上拉加载更多...',
        totalCount: '',
        a: '',
        url1: '',
        b: '',
        url2: '',
        c: '',
        url3: '',
        d: '',
        url4: '',
        e: '',
        url5: ''
        // list: ''
      }
    },
    components: {
      'y-banner': Banner,
      'y-list': List
    },
    methods: {
      getData() {
        this.$http.post(commonUrl + "/restful/", {
          typeFlag: '1'
        }).then(response => {
          if (response.data.errcode == 0) {
            this.getScoreLog = response.data.scoreLog;
            this.totalGetCount = (response.data.recordCount + 9) / 10;
          }
        }, response => {
        });
      },
      showmore(){
        this.$router.push('/fish')
      },
      onSwipeLeft() {
        this.$router.push('/main/aboutfishing')
        console.log('swiper')
      }
      // 下拉加载更多
      // loadBottom() {
      //   this.pageNo += 1;
      //   if (this.pageNo == this.totalGetCount) {
      //     this.allLoaded = true;
      //   }
      //   let param = new URLSearchParams()
      //   param.append('page', this.pageNo)
      //   this.axios.post('http://yulejia.pnnnc.com/api/getfishing', param)
      //     .then(res => {
      //       if (res.data.code == '1') {
      //         // console.log(res.data.data.data)

      //         this.lists = this.lists.concat(res.data.data.data)
      //         console.log(this.lists);
      //       }
      //     })
      // },
    },
    created() {
      this.$store.dispatch('changeNavbarActive', 0)
    },
    mounted() {
      $(function(){
        $(".film_focus").th_video_focus({
          navContainerClass:".film_focus_nav",
          focusContainerClass:".film_focus_imgs",
          delayTime:3000
        });
      }); 
      console.log(this.$store.getters.url);
      let param = new URLSearchParams()
      param.append('type', 'top')
      this.axios.post('http://yulejia.pnnnc.com/api/getinfo', param)
        .then(res => {
          this.a = res.data.data[0].content
          this.url1 = res.data.data[0].url
          this.b = res.data.data[1].content
          this.url2 = res.data.data[1].url
          this.c = res.data.data[2].content
          this.url3 = res.data.data[2].url
          this.d = res.data.data[3].content
          this.url4 = res.data.data[3].url
          this.e = res.data.data[4].content
          this.url5 = res.data.data[4].url
          // this.c = res.data.data[2].content
          // this.url3 = res.data.data[2].content
        })
    }
  }

</script>

<style lang="css" scoped>
  .slide-top-enter-active {
    transition: all .3s ease;
  }

  .slide-top-leave-active {
    transition: all .25s ease-out;
  }

  .slide-top-enter,
  .slide-top-leave-active {
    transform: translateX(-180px);
    opacity: 0;
  }

  .related {
    height: 3.18518519rem;
  }

  .related div {
    text-align: center;
    width: 33.33333333%;
    float: left;
    padding-top: .462962963rem;
  }

  .related img {
    width: 1.38888889rem;
    height: 1.38888889rem;
  }

  .related p {
    line-height: 1.11111111rem;
    font-size: .388888889rem;
    color: #3e3a39;
  }

  .headlines {
    border-top: 1px solid #f0f0f0;
    height: .925925926rem;
    padding-left: .407407407rem;
    font-size: 14px;
    color: #ababab;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
  }

  .headlines img {
    width: 1.03703704rem;
    height: .37962963rem;
    vertical-align: top;
  }

  .headlines i {
    margin: 0 .185185185rem;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #dcdddd;
    vertical-align: top;
  }
  .headlines .topper{
    flex: 1;
    height: 0.88rem;
    line-height: 0.88rem;
    color: rgb(0,0,0);
  }
  .list-head img {
    height: .925925926rem;
    width: 100%;
  }

  .more {
    background: #f0f0f0;
    color: #999;
    font-size: 28px;
    position: relative;
    width: 100%;
    height: .8rem;
    line-height: .6rem;
    bottom: 1.40740741rem;
    text-align: center;
  }

  .more p {
    font-size: 12px;
  }
  .film_focus {
  width:100%;
  height:100%;
  overflow:hidden;
  position:relative;
  /*margin:20px auto;*/
}
.film_focus .film_focus_imgs_wrap {
  width: 100%;
  height: 100%;
  /*background:url(.images/load.gif) no-repeat center center;*/
}
.film_focus ul.film_focus_imgs {
  width: 100%;
  position:absolute;
  right:0;
  top:0;
  overflow:hidden;
}
.film_focus ul.film_focus_imgs li {
  width: 100%;
  height: 0.88rem;
  overflow:hidden;
  padding: 0;
  font-size: 14px;
}
.film_focus ul.film_focus_imgs li img {
  height:340px;
  width:626px;
}
.film_focus ul.film_focus_imgs li a{
  display: block;
  line-height: 0.88rem;
  color: #000 !important;
}
.film_focus .film_focus_desc h3 {
  height:45px;
  line-height:45px;
  overflow:hidden;
  position:absolute;
  left:232px;
  bottom:0;
  background:rgba(0, 0, 0, .5);
  color:#fff;
  width:100%;
  padding-left:20px;
  z-index:99;
  font-size:16px;
 /*filter:progid:DXImageTransform.Microsoft.gradient(enabled='true', startColorstr='#7F000000', endColorstr='#7F000000');*/
}
.film_focus ul.film_focus_nav {
  width:232px;
  height:340px;
  position:absolute;
  left:0;
  top:0;
  z-index:100;
}
.film_focus ul.film_focus_nav li {
  height:47px;
  background:#d7d7dc;
  margin:0px 0px 5px 0;
  padding:0px 18px 0 19px;
  position:relative;
  width:190px;
  cursor: pointer;
  cursor: hand;
  color:#333;
  font-weight:bold;
  font-size:14px;
  overflow:hidden;
  line-height:47px;
}
.film_focus ul.film_focus_nav li.cur {
  /*background:url(.images/hd_on.png) no-repeat;*/
  width:190px;
  height:132px;
  left:0px;
  padding:0px 33px 0 25px;
  /*_background:url(.images/hd_on.png) no-repeat 0 0;*/
  word-break:break-all;
  color:#fff;
  font-weight:bold;
  font-size:22px;
  overflow:hidden;
  line-height:30px;
}
.film_focus ul.film_focus_nav li b {
  display:none
}
.film_focus ul.film_focus_nav li b span {
  display:block
}
.film_focus ul.film_focus_nav li.cur b {
  display:block;
  vertical-align: middle;
  display: table-cell;
  height:132px;
}
.film_focus ul.film_focus_nav li.cur span {
  display:none
}
</style>
