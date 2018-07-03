<template lang="html">
  <div class="index">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <y-footer></y-footer>
    <!--地图盒子,不加样式，默认不显示-->
    <div id="allmap"></div>
  </div>
</template>
<script>
  import Footer from '@/components/Footer.vue'

  export default {
    components: {
      'y-footer': Footer
    },
    mounted() {

    },
    methods: {

    }
  }

</script>

<style lang="css" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter,
  .fade-leave-to
  /* .component-fade-leave-active for <2.1.8 */

  {
    opacity: 0;
  }
</style>