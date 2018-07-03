<template lang="html">
  <div class="membership">
    <div class="maskdiv" v-show="maskdiv"></div>
    <header-item title="申请成为会员"></header-item>
    <div class="contentavatar">
      <label class="left">头像</label>
      <label>建议上传证件照，该照片用于会员证</label>
      <div class="right">
        <!-- <img src="static/images/person3.jpg" alt="" class="img1"> -->
        <el-upload
          class="avatar-uploader"
          action="http://yulejia.pnnnc.com/admin/upload/upload.html"
          accept="image/*"
          :show-file-list="false"
          :on-preview="getUrl"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="photo" :src="photo" class="avatarimg" style="width:1.5rem;height:1.5rem;border-radius:50%">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- <div class="spread"></div> -->
      </div>
    </div>
    <div class="bar"></div>
    <div class="sex">
      <div class="content">
        <div class="circle" @click="select('nselct')" :class="{isSelect: Tab ==='nselct'}">
          <div class="gou" v-show="yes"></div>
        </div>
        <span>男</span>
      </div>
      <div class="content">
        <div class="circle" @click="select('selct')" :class="{isSelect: Tab ==='selct'}">
          <div class="gou" v-show="yes"></div>
        </div>
        <span>女</span>
      </div>
    </div>
    <div class="bar"></div>
    <!-- <div class="sex">
      <div class="content" v-for="(job,index) in job_cate">
        <div class="circle" @click="selectJob(index)" :class="{isSelect: job.change}">
          <div class="gou" v-show="yes"></div>
        </div>
        <span>{{job.name}}</span>
      </div>
    </div>
    <div class="bar"></div> -->
    <div class="details">
      <span class="span">姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名<input ref="name" type="text" placeholder="您的姓名" v-model="title"></span>
      <span class="span">身份证号码<input ref="idCard" type="text" maxlength="18" placeholder="您的身份证号码" v-model="idCard"></span>
      <span class="span">手&nbsp&nbsp&nbsp机&nbsp&nbsp&nbsp号<input ref="tel" type="text" placeholder="手机号" v-model="tel"></span>
      <span class="span">申&nbsp请&nbsp协&nbsp会
        <select name="cate_id" ref="cate_id" id="selectTravelCity">
          <option :value="cate.id" v-for="cate in cateName"><span v-html="cate.lefthtml"></span>{{cate.name}}</option>
        </select>
      </span>
      <span class="span">
        <label class="adc">通&nbsp信&nbsp地&nbsp址</label>
        <div style="displa:inline-block;margin-left:0.533333rem;font-size:0.373333rem">{{showAddress}}</div>
        <div ref="right" class="right">
          <!-- <router-link to="selectCity"> -->
            {{showAddress == ''?'请选择': ''}}
          <!-- </router-link> -->
          <div class="spread" @click="showChose"></div>
        </div>
      </span>
      <div class="adress"><span class="name">地&nbsp址&nbsp详&nbsp情</span><textarea ref="reason" name="reason" id="reason" cols="33" rows="8" placeholder="请确保地址和电话准确，以便发放会员证" v-model="reason"></textarea></div>
      <div class="bar"></div>
      <div class="size">
        <span>会员服型号<label>  (可选填)</label></span>
        <div class="size_circle">
          <div @click="star('selct1')"><span :class="{Selected: Tob ==='selct1'}">M</span></div>
          <div @click="star('selct2')"><span :class="{Selected: Tob ==='selct2'}">L</span></div>
          <div @click="star('selct3')"><span :class="{Selected: Tob ==='selct3'}">ML</span></div>
          <div @click="star('selct4')"><span :class="{Selected: Tob ==='selct4'}">2ML</span></div>
          <div @click="star('selct5')"><span :class="{Selected: Tob ==='selct5'}">3ML</span></div>
          <div @click="star('selct6')"><span :class="{Selected: Tob ==='selct6'}">4ML</span></div>
          <div @click="star('selct7')"><span :class="{Selected: Tob ==='selct7'}">5ML</span></div>
        </div>
      </div>
      <div class="bar"></div>
      <transition-group name="club">
        <div class="clubList" :key="club" v-for="(club,index) in clubList">
          <div class="club">
            <label>俱乐部信息 (可选填)</label>
            <img src="static/images/litter.png" alt="" @click="deleteClub(index)">
          </div>
          <span class="span">{{club.clubName}}<input type="text" v-model='club.clubNameVal' placeholder="俱乐部名称"></span>
          <span class="span">{{club.name}}<input type="text" v-model="club.nameVal" placeholder="您的姓名"></span>
          <span class="span sec">{{club.tel}}<input type="text" v-model="club.telVal" placeholder="电话"></span>
        </div>
      </transition-group>
      <div class="addclub">
        <label><span class="add">+</span></label>
        <label @click="addClub">
          添加其他俱乐部信息
        </label>
      </div>
      <div class="bar"></div>
      <span class="span">推荐人或单位名称<input v-model="recName" ref="recName" type="text" placeholder="推荐人名字 (可选填)"></span>
      <span class="span">推荐人或单位电话<input v-model="recTel" ref="recTel" type="text" placeholder="推荐人电话 (可选填)"></span>
    </div>
    <div class="mask">
      <div class="button" @click="submit">提交</div>
    </div>
    <div v-show="showPoint" ref="point" class="point"></div>
    <Vsjld></Vsjld>
    <div class="show" v-show="show">
      <div class="sure">
        已提交，等待审核
      </div>
      <div class="option">
        <div class="a" @click="cancel">取消</div>
        <div class="b" @click="conserver(tel, title)">下一步</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vsjld from './sanjild.vue'
export default {
  components: {
    Vsjld
  },
  data () {
    return {
      yes: true,
      Tab: 'nselct',
      Tob: 'selct1',
      showPoint: false,
      sex: '1',
      title: '',
      idCard: '',
      tel: '',
      cloth_size: 'M',
      cate_id: '',
      job_id: '2',
      job_cate: [],
      province: '',
      city: '',
      district: '',
      address: '',
      reason: '',
      recName: '',
      recTel: '',
      vipImg: '',
      // photo: 'http://img3.imgtn.bdimg.com/it/u=3439657231,4061920227&fm=214&gp=0.jpg',
      htImg: '',
      index: 0,
      clubList: [
        {
          clubName: '所属俱乐部',
          name: '负责人姓名',
          tel: '负责人电话',
          clubNameVal: '',
          nameVal: '',
          telVal: ''
        }
      ],
      club: [],
      cateName: '',
      show: false,
      maskdiv: false
    }
  },
  beforeCreate() {
    let params = new URLSearchParams()
    params.append('action', 'add')
    this.axios.post('http://yulejia.pnnnc.com/api/diaoxie',params)
      .then(res => {
        if(res.data.code == '0') {
          this.$router.push('/login')
        }
      })
  },
  mounted () {
    let params = new URLSearchParams()
    params.append('action', 'get_cate')
    this.axios.post('http://yulejia.pnnnc.com/api/diaoxie',params)
      .then(res => {
         this.cateName = res.data.data.cate
         this.job_cate = res.data.data.job_cate
         console.log(this.cateName)
      })
  },
  computed: {
    showAddress() {
      return this.$store.state.membership.province + this.$store.state.membership.city + this.$store.state.membership.district
    },
    photo() {
      return this.$store.state.membership.photo
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    conserver (a, b) {
      this.$router.push({
        name: 'pay', params: { a: a, b: b}
      })
    },
    //图片上传
    handleAvatarSuccess(res, file) {
        // this.photo = URL.createObjectURL(file.raw);
        this.$store.commit('choosePhoto', URL.createObjectURL(file.raw))
        this.vipImg = res
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/*';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
        // console.log(this.photo)
      },
      getUrl(file) {
        this.hyImg = file.response
      },




    addClub() {
      var jsonClub ={}
      jsonClub.clubName = '所属俱乐部'
      jsonClub.name = '负责人姓名'
      jsonClub.tel = '负责人电话'
      jsonClub.clubNameVal = ''
      jsonClub.nameVal = ''
      jsonClub.telVal = ''
      this.clubList.push(jsonClub)
    },
    deleteClub(index) {
      this.clubList.splice(index,1)
      console.log(index)
    },
    showChose() {
      this.$store.commit('showChose', true)
    },
    selectJob(index) {
      this.job_id = this.job_cate[index].id
      for(var i = 0; i<this.job_cate.length; i++) {
        this.$set(this.job_cate[i],'change', false)
        this.$set(this.job_cate[index],'change', true)
      }
    },
    select (type) {
      this.Tab = type
      if(this.Tab == 'nselct') {
        this.sex = '1'
      } else{
        this.sex = '2'
      }
    },
    star (type) {
      this.Tob = type
      if(this.Tob == 'selct1') {
        this.cloth_size = 'M'
      } else if(this.Tob == 'selct2') {
        this.cloth_size = 'L'
      } else if(this.Tob == 'selct3') {
        this.cloth_size = 'ML'
      } else if(this.Tob == 'selct4') {
        this.cloth_size = '2ML'
      } else if(this.Tob == 'selct5') {
        this.cloth_size = '3ML'
      } else if(this.Tob == 'selct6') {
        this.cloth_size = '4ML'
      } else if(this.Tob == 'selct7') {
        this.cloth_size = '5ML'
      }
    },
    submit() {
      if(this.title == '') {
        this.showPoint = true
        this.$refs.name.focus()
        this.$refs.point.innerHTML = '请填写你的名字'
        setTimeout(() => {
          this.showPoint = false
        }, 1000)
      } else if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.idCard))) {
        this.showPoint = true
        this.$refs.point.innerHTML = '请输入准确的身份证号码'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.idCard.focus()
        }, 1000)
      } else if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.tel))) {
        this.showPoint = true
        this.$refs.point.innerHTML = '请输入准确的手机号码'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.tel.focus()
        }, 1000)
      } else if(this.$refs.cate_id.value == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请填写你所在的协会名'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.cate_id.focus()
        }, 1000)
      } else if(this.reason == '') {
        this.showPoint = true
        this.$refs.point.innerHTML = '请填写你的详细地址'
        setTimeout(() => {
          this.showPoint = false
          this.$refs.reason.focus()
        }, 1000)
      } else if(this.recTel != '') {
        if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.recTel))) {
          this.showPoint = true
          this.$refs.point.innerHTML = '请输入准确的推荐人号码'
          setTimeout(() => {
            this.showPoint = false
            this.$refs.recTel.focus()
          }, 1000)
        } else {
          this.cate_id = this.$refs.cate_id.value
        console.log(this.cate_id)
        for(var i = 0; i< this.clubList.length; i++) {
          var club = {}
          club.clubName = this.clubList[i].clubNameVal
          club.name = this.clubList[i].nameVal
          club.tel = this.clubList[i].telVal
          this.club.push(club)
        }
        let params = new URLSearchParams()
        params.append('photo', this.vipImg)
        params.append('action', 'add')
        params.append('title', this.title)
        params.append('sex', this.sex)
        params.append('cate_id', this.cate_id)
        params.append('job_id', this.job_id)
        params.append('province', this.$store.state.membership.province)
        params.append('city', this.$store.state.membership.city)
        params.append('district', this.$store.state.membership.district)
        params.append('cloth_size', this.cloth_size)
        params.append('tel', this.tel)
        params.append('idcard', this.idCard)
        params.append('address', this.address)
        params.append('club', JSON.stringify(this.club))
        this.axios.post('http://yulejia.pnnnc.com/api/diaoxie', params)
          .then(res => {
            if(res.data.code == '-1') {
              this.showPoint = true
              this.$refs.point.innerHTML = '发布失败'
              setTimeout(() => {
                this.showPoint = false
              }, 1000)
            } else if(res.data.code == '1') {
              this.show = true
              this.maskdiv = true
            } else {
              this.showPoint = true
              this.$refs.point.innerHTML = '登录失效'
              setTimeout(() => {
                this.showPoint = false
                this.$router.push('/login')
              }, 1000)
            }
          })
        }
      } else {
        this.cate_id = this.$refs.cate_id.value
        console.log(this.cate_id)
        for(var i = 0; i< this.clubList.length; i++) {
          var club = {}
          club.clubName = this.clubList[i].clubNameVal
          club.name = this.clubList[i].nameVal
          club.tel = this.clubList[i].telVal
          this.club.push(club)
        }
        let params = new URLSearchParams()
        params.append('photo', this.photo)
        params.append('action', 'add')
        params.append('title', this.title)
        params.append('sex', this.sex)
        params.append('cate_id', this.cate_id)
        params.append('job_id', this.job_id)
        params.append('province', this.$store.state.membership.province)
        params.append('city', this.$store.state.membership.city)
        params.append('district', this.$store.state.membership.district)
        params.append('cloth_size', this.cloth_size)
        params.append('tel', this.tel)
        params.append('idcard', this.idCard)
        params.append('address', this.address)
        params.append('club', JSON.stringify(this.club))
        this.axios.post('http://yulejia.pnnnc.com/api/diaoxie', params)
          .then(res => {
            if(res.data.code == '-1') {
              this.showPoint = true
              this.$refs.point.innerHTML = '发布失败'
              setTimeout(() => {
                this.showPoint = false
              }, 1000)
            } else if(res.data.code == '1') {
              this.show = true
              this.maskdiv = true
            } else {
              this.showPoint = true
              this.$refs.point.innerHTML = '登录失效'
              setTimeout(() => {
                this.showPoint = false
                this.$router.push('/login')
              }, 1000)
            }
          })
      }

    }
  }
}
</script>

<style lang="css" scoped>
/*头像上传*/
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 1.4rem;
    height: 1.2rem;
    border-radius: 50%;
    line-height: 1.3rem;
    text-align: center;
  }
  .membership  .contentavatar {
    display: flex;
    align-items: center;
  }


.club-enter-active,.club-leave-active{
  transition: all .4s;
}
.club-enter,.club-leave-active{
  transform: scale(0);
}
* {
  box-sizing: border-box;
}
select#selectTravelCity
            {
               width                    : 75%;
               height: 0.8rem;
               line-height: 0.8rem;
               padding-left: 0.266667rem;
               /*padding                  : 0.266667rem 0.533333rem;*/
               vertical-align           : middle;
               border                   : 1px solid #cccccc;
               -moz-border-radius       : 0.2em;
               /*line-height: */
               -webkit-border-radius    : 0.2em;
               border-radius            : 0.2em;
               /*box-shadow               : inset 0 0 3px #a0a0a0;*/
               -webkit-appearance       : none;
               -moz-appearance          : none;
               appearance               : none;
               /* sample image from the webinfocentral.com */
               background               : url(http://webinfocentral.com/Images/favicon.ico) 95% / 10% no-repeat #fdfdfd;
               font-family              : Arial,  Calibri, Tahoma, Verdana;
               font-size                : 0.373333rem;
               color                    : #cdc1c5;
               cursor                   : pointer;
               vertical-align: middle;
               border: 0; background: transparent;
            }
            select#selectTravelCity  option
            {
                font-size               : 0.373333rem;
                /*padding                 : 0.2em 0.4em 0.2em 0.4em;*/
                direction: ltl;
            }
            select#selectTravelCity  option[selected]{ 
              /*font-weight:bold*/
            }
            select#selectTravelCity  option:nth-child(even) { 
              background-color:#f5f5f5; 
            }
            select#selectTravelCity:hover
            {
                color                   : #101010;
                /*border                  : 1px solid #cdcdcd;*/
            }
            select#selectTravelCity:focus {
              /*box-shadow: 0 0 2px 1px #404040;*/
            }

            /*SELECT W/DOWN-ARROW*/
            select#selectPointOfInterest
            {
               width                    : 185pt;
               height                   : 40pt;
               line-height              : 40pt;
               padding-right            : 20pt;
               text-indent              : 4pt;
               text-align               : left;
               vertical-align           : middle;
               box-shadow               : inset 0 0 3px #606060;
               border                   : 1px solid #acacac;
               -moz-border-radius       : 6px;
               -webkit-border-radius    : 6px;
               border-radius            : 6px;
               -webkit-appearance       : none;
               -moz-appearance          : none;
               appearance               : none;
               font-family              : Arial,  Calibri, Tahoma, Verdana;
               font-size                : 18pt;
               font-weight              : 500;
               color                    : #000099;
               cursor                   : pointer;
               outline                  : none;
            }
            select#selectPointOfInterest option
            {
                padding             : 4px 10px 4px 10px;
                font-size           : 0.373333rem;
                font-weight         : normal;
            }
            select#selectPointOfInterest option[selected]{ font-weight:bold}
            select#selectPointOfInterest option:nth-child(even) { background-color:#f5f5f5; }
            select#selectPointOfInterest:hover {font-weight: 700;}
            select#selectPointOfInterest:focus {box-shadow: inset 0 0 5px #000099; font-weight: 600;}

            /*LABEL FOR SELECT*/
            label#lblSelect{ position: relative; display: inline-block;}
            /*DOWNWARD ARROW (25bc)*/
            label#lblSelect::after
            {
                content                 : "\25bc";
                position                : absolute;
                top                     : 0;
                right                   : 0;
                bottom                  : 0;
                width                   : 20pt;
                line-height             : 40pt;
                vertical-align          : middle;
                text-align              : center;
                background              : #000099;
                color                   : #fefefe;
               -moz-border-radius       : 0 6px 6px 0;
               -webkit-border-radius    : 0 6px 6px 0;
                border-radius           : 0 6px 6px 0;
                pointer-events          : none;
            }
.point{
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: rgba(0,0,0,.7);
  color: #fff;
  border-radius: 5px;
}
.membership {
  padding-top: 1.5rem;
  width: 100%;
  height: 100%;
}
.left {
  padding-left: .2rem;
}
.avatarimg {
  width: 100%;
  display: flex;
  align-items: center;
}
label:nth-child(1) {
  /*padding-left: .2rem;*/
  font-size: 16px;
  /*flex: .7;*/
}
label:nth-child(2) {
  color: #5DBCFA;
  font-size:13px;
  flex: 4;
}
.right {
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: .3rem;
}
.spread {
  width: .4rem;
  height: .4rem;
  transform: rotate(225deg);
  border-bottom: 1px solid #BBBBBB;
  border-left: 1px solid #BBBBBB;
  /*margin-right: .4rem;
  margin-top: .1rem;*/
}
.img1 {
  width: 1.4rem;
  height: 1.2rem;
  border-radius: 50%;
}
.bar {
  width: 100%;
  height: .3rem;
  background-color: #F0F0F0;
}
.circle {
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
  margin-right: .2rem;
  border: 1px solid #EFEFEF;
  display: inline-block;
  vertical-align: middle;
}
.gou {
  width: .35rem;
  height: .2rem;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(-45deg);
  margin-top: .1rem;
  margin-left: .08rem;
}
.isSelect {
  background-color: #119DF8;
  border: none;
}
.sex {
  line-height: 1.2rem;
}
.content {
  margin-left: 0.533333rem;
  float: left;
}
.content span{
  vertical-align: middle;
  font-size: 14px;
}
.span {
  display: block;
  line-height: 1.2rem;
  padding-left: .3rem;
  font-size: 15px;
  border-bottom: 1px solid #F0F0F0;
}
input {
  margin-left: .4rem;
  width: 55%;
  font-size: 14px;
}
span:nth-child(5) {
  display: flex;
  /*justify-content: space-between;*/
}
span:nth-child(6) {
  display: flex;
  /*justify-content: space-between;*/
}
.adc {
  /*flex: 6;*/
  /*margin-right: 4.2rem;*/
}
.right {
  /*flex: .8;*/
  font-size: 14px;
  opacity: .7;
  display: flex;
  justify-content: flex-end;
}
textarea {
  margin-right: .2rem;
  border: none;
  flex: 3;
  font-size: 14px;
}
.adress {
  display: flex;
  width: 100%;
  padding-top: .3rem;
  padding-left: .3rem;
  padding-right: .3rem;
}
.name {
  font-size: 15px;
  flex: 1;
}
.size {
  padding: .3rem .3rem 0 .3rem;
}
.size span {
  font-size: 14px;
}
.size_circle {
  display: flex;
  padding-left: .2rem;
}
.size_circle div {
  margin-top: .3rem;
  margin-bottom: .3rem;
  text-align: center;
  flex: 1;
  border-radius: 50%;
  background-color: #efefef;
  margin-right: .31rem;
}
.size_circle > div > span {
  display: block;
  width: 1rem;
  border-radius: 50%;
  line-height: 1rem;
  font-size: 12px;
  opacity: .8;
  /*background-color: #efefef;*/
  /*border: 1px solid #F0F0F0;*/
}
.club {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1rem;
  padding: .2rem .3rem;
  border-bottom: 1px solid #F0F0F0;
}
.club label {
  opacity: .7;
}
.club img {
  width: .5rem;
  height: .5rem;
}
.addclub {
  width: 80%;
  /*height: 1rem;*/
  border: 1px solid #119DF8;
  margin-left: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.2rem;
  border-radius: 4px;
  margin-bottom: .4rem;
}
.sec {
  margin-bottom: .4rem;
}
.addclub label:nth-child(1) {
  line-height: 1.2rem;
  padding-left: 1.8rem;
  padding-right: .3rem;
}
.addclub label:nth-child(2) {
  text-align: left;
  font-size: 14px;
  font-weight: 500;
}
.add {
  width: .6rem;
  height: .6rem;
  display: block;
  /*height: .5rem;*/
  background-color: #119DF8;
  border-radius: 50%;
  color: white;
  font-weight: 600;
  text-align: center;
  line-height: .6rem;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: #F0F0F0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button {
  width: 80%;
  height: 1.4rem;
  background-color: #119DF8;
  margin: .4rem 0;
  text-align: center;
  line-height: 1.4rem;
  font-size: 16px;
  color: white;
  border-radius: 3px;
}
.Selected {
  background-color: #f39800;
  color: white;
}
.size label {
  opacity: .6;
  font-size: 14px;
}
.show {
  position: fixed;
  width: 8rem;
  height: 5rem;
  top: 6.3rem;
  left: 1rem;
  border-radius: 10px;
  background-color: white;
  z-index: 100;
}
.sure {
  width: 100%;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid #F0F0F0;
}

.option {
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.a,
.b {
  flex: 1;
  text-align: center;
  font-size: 20px;
}

.b {
  color: #47ABF9;
  border-left: 1px solid #F0F0F0;
}
.maskdiv {
  position: fixed;
  top: 1.35185185rem;
  width: 100%;
  height: 100%;
  background-color: #808080;
  filter: alpha(Opacity=60);
  -moz-opacity: 0.6;
  opacity: 0.6;
  overflow-y: hidden;
  z-index: 99;
}
</style>
