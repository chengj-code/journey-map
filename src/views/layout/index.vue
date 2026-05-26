<template>
  <div class="layout-container">
    <div class="content">
      <Home v-show="active === 0" />
      <Statistics v-show="active === 1" />
      <User v-show="active === 2" />
    </div>
    <div class="custom-tabbar">
      <div
        v-for="(item, index) in tabs"
        :key="item.label"
        :class="['tab-item', { active: active === index }]"
        @click="handleTabClick(index)"
      >
        <span class="tab-icon">{{ item.icon }}</span>
        <span class="tab-label">{{ item.label }}</span>
        <div v-if="active === index" class="tab-indicator" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Home from '@/views/home/index.vue'
import Statistics from '@/views/statistics/index.vue'
import User from '@/views/user/index.vue'

const active = ref(0)

const tabs = [
  { icon: '🏠', label: '首页' },
  { icon: '📊', label: '统计' },
  { icon: '👤', label: '我的' },
]

function handleTabClick(index: number) {
  active.value = index
}
</script>

<style scoped lang="less">
.layout-container {
  position: relative;
  min-height: 100vh;
}

.content {
  height: calc(100vh - 62px);
  padding-bottom: env(safe-area-inset-bottom);
}

.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid #E2E8F0;
  border-radius: 18px 18px 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 999;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  position: relative;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  min-height: 44px;
  min-width: 44px;
  padding: 8px 0;

  &:active {
    transform: scale(0.92);
    transition: transform 0.1s ease;
  }
}

.tab-icon {
  font-size: 25px;
  line-height: 1;
  color: #94A3B8;
  transition: color 0.3s ease, transform 0.2s ease;
}

.tab-label {
  font-size: 11px;
  color: #64748B;
  font-weight: 400;
  transition: all 0.3s ease;
  line-height: 1.2;
}

.tab-indicator {
  position: absolute;
  bottom: 2px;
  width: 22px;
  height: 3px;
  background: #10B981;
  border-radius: 2px;
  animation: indicatorIn 0.25s ease forwards;
}

@keyframes indicatorIn {
  from {
    opacity: 0;
    transform: scaleX(0);
  }
  to {
    opacity: 1;
    transform: scaleX(1);
  }
}

.tab-item.active {
  .tab-icon {
    color: #10B981;
    font-size: 28px;
    transform: scale(1.1);
  }

  .tab-label {
    color: #10B981;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
