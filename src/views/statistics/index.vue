<template>
  <div class="statistics-page">
    <van-nav-bar
      title="点亮统计"
      left-arrow
      @click-left="router.back()"
    />

    <div class="page-content">
      <div class="stats-overview">
        <div class="overview-icon">📊</div>
        <div class="overview-info">
          <div class="overview-total">{{ totalVisited }}</div>
          <div class="overview-sub">省级 {{ provinceCount }} · 市级 {{ cityCount }}</div>
        </div>
      </div>

      <van-collapse v-model="activeNames" class="stats-collapse">
        <van-collapse-item name="province">
          <template #title>
            <div class="collapse-header">
              <span class="collapse-title">省级点亮</span>
              <span class="collapse-badge">{{ provinceCount }}</span>
            </div>
          </template>
          <div v-if="provinceData.length > 0" class="item-list">
            <div
              v-for="(item, index) in provinceData"
              :key="'p-' + index"
              class="stat-item"
            >
              <IconProvince
                :province-name="item.name"
                :label="item.name.slice(0, 1)"
                :size="36"
              />
              <span class="item-name">{{ item.name }}</span>
            </div>
          </div>
          <van-empty v-else description="暂无省级点亮数据" :image-size="60" />
        </van-collapse-item>

        <van-collapse-item name="city">
          <template #title>
            <div class="collapse-header">
              <span class="collapse-title">市级点亮</span>
              <span class="collapse-badge">{{ cityCount }}</span>
            </div>
          </template>
          <div v-if="cityData.length > 0" class="item-list">
            <div
              v-for="(item, index) in cityData"
              :key="'c-' + index"
              class="stat-item"
            >
              <IconProvince
                :province-name="getCityProvinceName(item)"
                :label="(item.fullName || item.name).slice(0, 1)"
                :size="36"
              />
              <span class="item-name">{{ item.fullName || item.name }}</span>
            </div>
          </div>
          <van-empty v-else description="暂无市级点亮数据" :image-size="60" />
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMapStore } from '@/store'
import { IconProvince } from '@/components/icons'

const router = useRouter()
const mapStore = useMapStore()
const activeNames = ref<string[]>([])

const provinceData = computed(() => mapStore.provinceData.filter(item => item.selected))
const cityData = computed(() => mapStore.cityData.filter(item => item.selected))
const provinceCount = computed(() => provinceData.value.length)
const cityCount = computed(() => cityData.value.length)
const totalVisited = computed(() => provinceCount.value + cityCount.value)

function getCityProvinceName(item: { fullName?: string; name: string }): string {
  const fullName = item.fullName || item.name
  return fullName.split('/')[0] || item.name
}
</script>

<style scoped lang="less">
.statistics-page {
  min-height: 100vh;
  background: #F8FAFC;
}

.page-content {
  padding: 16px;
}

.stats-overview {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #134E4A 100%);
  border-radius: 16px;
  color: white;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.12);
  margin-bottom: 20px;

  .overview-icon {
    font-size: 32px;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 14px;
  }

  .overview-info {
    .overview-total {
      font-size: 32px;
      font-weight: 700;
      color: #10B981;
      line-height: 1.2;
    }

    .overview-sub {
      font-size: 13px;
      opacity: 0.8;
      margin-top: 4px;
    }
  }
}

.stats-collapse {
  :deep(.van-collapse-item) {
    margin-bottom: 12px;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);

    .van-collapse-item__title {
      padding: 14px 16px;
      background: #fff;
    }

    .van-collapse-item__content {
      padding: 0;
      background: #FAFBFC;
    }

    .van-cell::after {
      display: none;
    }
  }
}

.collapse-header {
  display: flex;
  align-items: center;
  gap: 10px;

  .collapse-title {
    font-size: 16px;
    font-weight: 600;
    color: #1E293B;
  }

  .collapse-badge {
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: #10B981;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.item-list {
  padding: 8px 0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;

  &:active {
    background: #F1F5F9;
  }

  .item-name {
    font-size: 14px;
    color: #334155;
    font-weight: 500;
  }
}

:deep(.van-nav-bar) {
  background: #fff;
}

:deep(.van-nav-bar__title) {
  color: #1E293B;
  font-weight: 600;
}

:deep(.van-empty) {
  padding: 28px 0;
}
</style>
