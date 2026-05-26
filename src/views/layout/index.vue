<template>
  <div>
    <div class="content">
      <Home v-show="active === 0" />
      <Statistics v-show="active === 1" />
      <User v-show="active === 2" />
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o">统计</van-tabbar-item>
      <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Home from '@/views/home/index.vue'
import Statistics from '@/views/statistics/index.vue'
import User from '@/views/user/index.vue'
const active = ref(0)
</script>

<style scoped lang="less">
.content {
  height: calc(100vh - 50px);
}
</style>
