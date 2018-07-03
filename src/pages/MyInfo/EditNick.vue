<template lang="html">
  <div class="editnick header-item allbg">
    <header-item title="修改昵称"></header-item>
    <input type="text" placeholder="请输入您要修改的昵称,例如江西鱼王" ref="nickname">
    <div class="edit">
      <p class="tip">4-30个字符，支持中英文、数字</p>
      <button @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  methods: {
    confirm() {
      let nickName = this.$refs.nickname.value
      let param = new URLSearchParams()
      param.append('type', 'edit')
      param.append('nickname', nickName)
      this.axios.post('http://yulejia.pnnnc.com/api/user', param)
        .then(res => {
          if (res.data.code === 1) {
            Toast({
              message: '修改成功',
              position: 'middle',
              duration: 1500
            });
            let that = this
            setTimeout(function () {
              that.$router.push('/myinfo')
            }, 1800);
          }
        })
    }
  }
}
</script>

<style lang="css" scoped>
.editnick {
  overflow: hidden;
  background-color: #f0f0f0;
}

.editnick::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -999;
  background-color: #f0f0f0;
}

input {
  margin-top: .296296296rem;
  width: 100%;
  height: 1.24074074rem;
  padding-left: .407407407rem;
  font-size: 14px;  
}

.edit {
  padding: 0 .407407407rem;
  margin-top: .259259259rem;
  background-color: #f0f0f0;
}

.tip {
  font-size: .314814815rem;
  color: #b5b5b6;
  margin-bottom: 1.07407407rem;
}

button {
  width: 100%;
  height: 1.11111111rem;
  color: #fff;
  background-color: #119df8;
  border: 0;
  font-size: .44444444rem;
  border-radius: 5px;
}
</style>
