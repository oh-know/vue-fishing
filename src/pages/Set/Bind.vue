<template lang="html">
  <div class="bind allbg header-item">
    <header-item title="绑定手机"></header-item>
    <form>
      <div class="input">
        <div class="tel">
          <img src="static/images/tel.jpg">
          <input type="text" placeholder="请输入您的手机号"
          @input="checkTel()" required maxlength="11" ref="tel">
        </div>
        <div class="vertify">
          <img src="static/images/vertify.jpg">
          <input type="text" placeholder="请输入验证码" minlength="6" maxlength="6"
          ref="vertify">
          <button :disabled="disabled || time > 0" :class="{active: isActive}"
            @click="send()" ref="btn">{{tip}}</button>
        </div>
      </div>
      <div class="confirm-btn">
        <!-- <router-link to="/set/bindok"> -->
          <button @click="checkForm">确定</button>
        <!-- </router-link> -->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      isActive: false,
      second: 60,
      time: 0
    }
  },
  computed: {
    tip () {
      return this.time > 0 ? this.time : '获取验证码'
    }
  },
  methods: {
    run () {
      this.time = this.second
      this.timer()
    },
    timer () {
      if (this.time > 0) {
        this.time--
        setTimeout(this.timer, 1000)
      }
    },
    // 点击获取
    send () {
      this.disbaled = true
      this.sended()
    },
    // 已经点击，正在获取
    sended () {
      this.run()
      this.disabled = false
    },
    // 验证手机号
    checkTel () {
      let tel = this.$refs.tel.value
      // let btn = this.$refs.btn
      // 手机号码验证
      if ((/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test(tel)) {
        this.isActive = true
        // btn.removeAttribute('disabled')
        this.disabled = false
      } else {
        this.isActive = false
      }
    },
    checkForm () {
      let tel = this.$refs.tel.value
      let checkCode = this.$refs.vertify.value
      if (tel === '') {
        alert('手机号不能为空')
      }
      if (checkCode === '') {
        alert('验证码不能为空')
      }
      if (tel !== '' && !(/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/).test(tel)) {
        alert('手机号码格式不正确')
        return false
      }
      if (checkCode !== '' && checkCode !== '123456') {
        alert('验证码不正确')
        return false
      }
    }
  }
}
</script>

<style lang="css" scoped>
* {
  overflow: hidden;
}
.input div {
  width: 100%;
  height: 1.31481481rem;
  position: relative;
  border-bottom: 1px solid #f0f0f0;
}
.input input {
  width: 100%;
  height: 100%;
  font-size: .407407407rem;
  padding-left: 1.2037037rem;
}
.input img {
  position: absolute;
  left: .425925926rem;
}
.input .tel img {
  width: .296296296rem;
  height: .462962963rem;
  top: .44444444rem;
}
.input .vertify img {
  height: .37037037rem;
  width: .37037037rem;
  top: .481481481rem;
}
.input button {
  position: absolute;
  right: .425925926rem;
  top: 0.314814815rem;
  width: 2rem;
  height: .759259259rem;
  /*font-size: .314814815rem;*/
  font-size: 12px;
  z-index: 999;
  /*background-color: #f39800;*/
  border: 0;
  color: #fff;
  text-align: center;
  border-radius: 4px;
  /*padding: 0 .185185185rem;*/
}
button.active {
  background-color: #f39800;
}
.confirm-btn {
  padding: 0 .425925926rem;
  padding-top: .740740741rem;
  background-color: #f0f0f0;
}
.confirm-btn button {
  height: 1.11111111rem;
  width: 100%;
  background-color: #119df8;
  border: 0;
  color: #fff;
  font-size: .407407407rem;
  border-radius: 5px;
}
</style>
