<template>
  <div class="bg-[#f5f5f5] h-[100%]">
    <div class="p-[10px] flex justify-between">
      <span @click="toLogin">用户信息</span>
      <span @click="toLogin">退出登录</span>
    </div>
    <div class="card flex">
      <div class="w-[100px] h-[100px] shrink-[0]">
        <img class="w-[100%] h-[100%]" :src="avatar" alt="">
      </div>
      <div class="flex-1 shrink-[0] p-[10px]">
        <div class="h-[30px] text-[20px] font-bold mb-[20px]">布布</div>
        <div class="h-[30px] text-[16px] text-[#999]">198****0822</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import avatar from '@/assets/images/avator.jfif'
const router = useRouter()
const toLogin = () => {
  router.push('/login')
}
</script>
<!-- <style scoped lang="less">
.card {
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.avator {
  width: 100px;
  height: 100px;
}
</style> -->
