<script setup lang="ts">
  import Header from '@components/Header.vue'
  import { version } from '../../package.json'
  import SvgIcon from '@components/SvgIcon/index.vue'
  import { useAppStore } from '@/store/modules/app'

  const appStore = useAppStore()

  // const user = await userApi.getUserProfile()
  // console.log(user, '获取用户信息')
</script>
<template></template>

<style lang="less" scoped> 
  .version {
    display: inline-block;
    padding: 6px;
    margin-left: 6px;
    border-radius: 10px;
  }
</style>
