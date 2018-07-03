<template lang="html">
  <div class="order" @click="show">
    <p>我的订单</p>
    <p>查看全部订单</p>
    <i></i>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
  methods: {
    show() {
      Toast({
        message: '开发中...',
        position: 'middle',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="css" scoped>
.order {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
  width: 100%;
  line-height: 1.24074074rem;
  padding-left: .407407407rem;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.order p:first-child {
  flex: 1;
  font-size: .37037037rem;
}

.order p:not(:first-child) {
  font-size: .324074074rem;
  color: #9b9b9c;
}

.order i {
  border-top: .0462962963rem solid #9b9b9c;
  border-right: .0462962963rem solid #9b9b9c;
  height: .277777778rem;
  width: .277777778rem;
  transform: rotate(45deg);
  margin-right: .3977777778rem;
  margin-left: .185185185rem;
}
</style>
