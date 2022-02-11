<template>
  <div>
    <!-- Your content -->
    <h1>Page</h1>
    <AtvLoading :loading="loading" />
  </div>
</template>

<script setup lang="ts" name="demo">
  import { ref } from 'vue'
  import AtvLoading from '@components/AtvLoading.vue'
  import { __setTitle } from '@/common/nativeMixin'
  let loading = ref(true)
  // document.title = 'baba'
  // 设置标题 小程序开发者工具无效 实机有效
  __setTitle('ABA')
  //APP能力
  //import dsbridge from 'dsbridge'
  //dsbridge.hasNativeMethod('getNameSpace')
  //import { getUserInfo } from '@/common/hybridUtils'
  //getUserInfo()

  //通信能力
  //import { useUserStore } from '@/store'
  //const userStore = useUserStore()

  //微信能力
  // const wx = window.wx
  //const demo = () => {
  //  wx.miniProgram.navigateTo({ url: '/v3/pages/xxxx' })
  //}

  //埋点能力
  //import { inject } from 'vue'
  //const $point: any = inject('$point')
  //$point.report('** something ** ')
</script>

<style lang="less" scoped></style>
