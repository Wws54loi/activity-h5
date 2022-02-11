<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
  import { __miniComputed, __getUid, __getLocation } from '@/common/nativeMixin'
  __miniComputed()
  __getUid()
  __getLocation()
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
