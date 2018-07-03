<template lang="html">
  <div class="container">
    <div class="list">
      <div class="list-item" v-for="(item, index) in lists" :key="item" @click="displayDetail(item.id)">
        <div class="img">
         <img v-lazy="'http://yulejia.pnnnc.com/uploads/images/'+item.photo[0]"
          v-if="item.photo[0].indexOf('http') === -1" >
          <img v-lazy="item.photo[0]" v-else>
        </div>
        <div class="name">
          <img src="static/images/icon01.jpg">
          <p>{{item.title}}</p>
          <img v-show="item.is_renzheng === 1" src="static/images/icon02.jpg">
        </div>
        <div class="num">
          <p class="price">{{item.price}}元/{{item.unit}}</p>
          <p></p>
        </div>
        <div class="a-btn">
          <button @click.prevent.stop="clickButton(item.id,index, $event,item.focus)" :class="{active: !item.focus }">
          {{item.focus ? '已关注' : '+ 关注'}}

          </button>
          <button><a :href="item.url" @click.stop>导航去</a></button>
        </div>
        <div class="types">
          <div>
            <span>类型：</span>
          </div>
          <div>
            <span class="type" v-for="item in item.type">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      lists: '',
      cateid: null,
      isFocus: true,
      isLogin: ''
    }
  },
  computed: {
    localCity() {
      return this.$store.state.selectCity.localCity
    },
    selectCity() {
      return this.$store.state.selectCity.selectCity
    }
  },
  methods: {
    clickButton(target_id, index, e, focus) {
      let id = target_id
      let param = new URLSearchParams()
      param.append('action', 'add')
      param.append('objid', id)
      param.append('cate_id', this.cateid)
      this.axios.post('http://yulejia.pnnnc.com/api/focus', param)
        .then(res => {
          if (res.data.code === 0) {
            Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1200
            });
          }
          // 判断已经关注的状态
          if (res.data.code === 1) {
            btn.classList.remove('active')
            this.lists[index].focus = !this.lists[index].focus
          }
           // 判断未关注的状态
          if (res.data.code === 2) {
            btn.classList.add('active')
            this.lists[index].focus = !this.lists[index].focus
          }
        })
        .catch(e => {
          console.log(e)
        })

      let btn = e.currentTarget
    },
    displayDetail(id) {
      this.$router.push({
        name: 'detail', params: { id: id }
      })
    }
  },
  mounted() {
    let param = new URLSearchParams()
    param.append('city', this.selectCity)
    param.append('is_tui', true)
    this.axios.post('http://yulejia.pnnnc.com/api/getfishing', param)
      .then(res => {
        console.log(res.data)
        if (res.data.code === 1) {
          let datas = res.data.data.data
          let head = 'http://yulejia.pnnnc.com/uploads/images/'
          for (let i = 0; i < datas.length; i++) {
            let photos = datas[i].photo
            for (let j = 0; j < photos.length; j++) {
              photos[j] = head + photos[j]
            }
          }
          this.cateid = res.data.data.focus.id
          this.lists = res.data.data.data
          console.log(this.lists)
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}

</script>

<style lang="css" scoped>
* {
  box-sizing: border-box;
}

a {
  color: #fff;
}

.list {
  column-count: 2;
  column-gap: .4rem;
  border-bottom: .296296296rem solid #f0f0f0;
  padding: .4rem .4rem 0 .4rem;
  margin-bottom: 1.4rem;
  /*box-sizing: border-box;*/
}

@media (min-width: 768px) {
  .list {
    column-count: 3;
  }
}

@media (min-width: 1024px) {
  .list {
    column-count: 4;
  }
}

.list-item {
  background-color: #f7f8f8;
  break-inside: avoid;
  margin-bottom: .4rem;
}

.list-item .img {
  width: 100%;
  height: 2.77777778rem;
  overflow: hidden;
}

.list-item .img img {
  width: 100%;
  height: 100%;
}

.list-item .name {
  text-align: center;
  margin-top: .277777778rem;
  margin-bottom: .351851852rem;
  height: .5rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.list-item .name img:first-child {
  width: .5rem;
  height: .425925926rem;
  display: inline-block;
  margin-right: .0925925926rem;
}

.list-item .name p {
  color: #3e3a39;
}

.list-item .name img:last-child {
  width: 15px;
  height: 15px;
  margin-left: .0925925926rem;
}

.list-item .num p:first-child {
  float: left;
  margin-left: .2222222222rem;
}

.list-item .num p:last-child {
  color: #a9a9a9;
  margin-right: .1222222222rem;
  float: right;
}

.list .a-btn {
  height: .8rem;
  overflow: hidden;
  margin-bottom: .314814815rem;
}

.list .a-btn span {
  font-size: 16px;
  font-weight: 700;
  margin-right: 2px;
}

.list-item .a-btn button {
  width: 1.85185185rem;
  line-height: .6rem;
  overflow: hidden;
  border-radius: 2px;
  font-size: 12px;
  margin-top: .1rem;
  margin-bottom: .1rem;
}

.list-item .a-btn button:first-child.active {
  color: #898989;
  border: 1px solid #898989;
  background-color: #fff;
}

.list-item .a-btn button:first-child {
  margin-left: .259259259rem;
  border: 1px solid #119df8;
  background-color: #fff;
  color: #119df8;
}

.list-item .a-btn button:last-child {
  margin-left: .11111111rem;
  border: 1px solid #119df8;
  background-color: #119df8;
  color: #fff;
}

.list-item .types {
  border-top: 1px dashed #a9a9a9;
  color: #a9a9a9;
  padding: .203703704rem;
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  line-height: 20px;
  height: 1.4rem;
}

@media (max-width: 320px) {
  .list-item .types {
    height: 1.6rem;
  }
}

.list-item .types div:first-child {
  font-size: 12px;
  float: left;
}

.list-item .types div:last-child {
  flex: 1;
  overflow: hidden;
}

.list-item .types .type {
  margin-right: 5px;
}

/*.more{
  position: fixed;
  bottom: 0;
}*/
</style>
