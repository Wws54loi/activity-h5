<template>
  <div>
    <div :style="{ zIndex: zIndex }" class="loading-global" v-if="loading">加载中...</div>
  </div>
</template>

<script setup lang="ts" name="loading">
  const props = defineProps({
    loading: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: Number,
      default: 999,
    },
  })
</script>
<style lang="less">
  .mint-msgbox {
    width: 280px;

    .mint-msgbox-header {
      padding: 20px 0 0;

      .mint-msgbox-title {
        font-size: 18px;
        color: #333333;
        font-weight: 600;
        line-height: 25px;
      }
    }

    .mint-msgbox-content {
      border-bottom: 1px solid #e4e4e4;
      padding: 8px 28px 18px;

      .mint-msgbox-message {
        line-height: 20px;
        font-size: 14px;
        color: #535353;
      }
    }

    .mint-msgbox-btns {
      height: 48px;
      line-height: 48px;

      .mint-msgbox-confirm {
        font-size: 15px;
        color: #303030;
      }
    }
  }
</style>
<style lang="less" scoped>
  .loading-global {
    position: fixed;
    background: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #303030;
    transition: all 300ms ease-in;
  }
</style>
