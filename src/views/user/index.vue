<template>
  <div class="bg-blue-500">
    我的页面
    <van-button type="primary" @click="toLogin">退出登录</van-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const toLogin = () => {
  router.push('/login')
}
</script>
