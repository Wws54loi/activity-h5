<template>
  <div>
    Your content1223
    <div class="tset" style=""></div>
    <h1 @click="getUser">点击获取用户信息</h1>
    <VantButton @click="toOtherPage" type="primary">主要按钮</VantButton>
  </div>
</template>

<script setup lang="ts" name="bin">
  // const wx = window.wx
  import { Button as VantButton } from 'vant'
  import dsbridge from 'dsbridge'
  import { getUserInfo } from '@/common/hybridUtils'
  import { getResponse } from '@/utils/http'
  import { useUserStore } from '@/store'
  import { inject } from 'vue'
  const $point: any = inject('$point')
  $point.report('pet_mtl_heart_init_help')
  const userStore = useUserStore()
  dsbridge.hasNativeMethod('getNameSpace')
  const wx = window.wx
  const getUser = async () => {
    // getUserInfo()
    const res = await getResponse(
      '/lazyUsers/invitationAwardInfos',
      {
        uid: userStore.uid,
      },
      {
        showLoading: false,
        version: 3,
      },
    )
  }
  const toOtherPage = () => {
    wx.miniProgram.navigateTo({ url: '/v3/pages/guide/assistant/index' })
  }
</script>

<style lang="less" scoped>
  .tset {
    width: 200px;
    height: 200px;
    background: pink;
  }
</style>
