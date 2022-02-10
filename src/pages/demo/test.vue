<template>
  <div>
    Your content1223
    <div class="tset" style=""></div>
    <h1 @click="getUser">点击获取用户信息</h1>
    <VantButton type="primary">主要按钮</VantButton>
  </div>
</template>

<script setup lang="ts" name="bin">
  import { Button as VantButton } from 'vant'
  import dsbridge from 'dsbridge'
  import { getUserInfo } from '@/common/hybridUtils'
  console.log(dsbridge)

  dsbridge.hasNativeMethod('getNameSpace')
  const getUser = () => {
    getUserInfo()
  }
</script>

<style lang="less" scoped>
  .tset {
    width: 200px;
    height: 200px;
    background: pink;
  }
</style>
