<template>
  <div class="statistics-page bg-[#f5f5f5] h-[100%] overflow-y-auto">
    <van-nav-bar title="点亮统计" />

    <div class="section">
      <div class="section-title">省级点亮 ({{ provinceCount }})</div>
      <van-cell-group v-if="provinceData.length > 0" inset>
        <van-cell
          v-for="(item, index) in provinceData"
          :key="index"
          :title="item.name"
        >
          <template #icon>
            <IconProvince
              :provinceName="item.name"
              :size="32"
              class="icon"
            />
          </template>
        </van-cell>
      </van-cell-group>
      <van-empty v-else description="暂无省级点亮数据" />
    </div>

    <div class="section">
      <div class="section-title">市级点亮 ({{ cityCount }})</div>
      <van-cell-group v-if="cityData.length > 0" inset>
        <van-cell
          v-for="(item, index) in cityData"
          :key="index"
          :title="item.fullName || item.name"
        />
      </van-cell-group>
      <van-empty v-else description="暂无市级点亮数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMapStore } from '@/store'
import { IconProvince } from '@/components/icons'

const mapStore = useMapStore()

const provinceData = computed(() => mapStore.provinceData.filter(item => item.selected))
const cityData = computed(() => mapStore.cityData.filter(item => item.selected))

const provinceCount = computed(() => provinceData.value.length)
const cityCount = computed(() => cityData.value.length)
</script>

<style scoped lang="less">
.statistics-page {
  padding-bottom: 20px;
}

.section {
  margin: 16px 0;

  .section-title {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    color: #323233;
    background-color: #fff;
    border-bottom: 1px solid #ebedf0;
  }

  .icon {
    width: 32px;
    height: 32px;
    margin-right: 12px;
    flex-shrink: 0;
  }
}

:deep(.van-nav-bar) {
  background-color: #fff;
}

:deep(.van-nav-bar__title) {
  color: #323233;
  font-weight: 600;
}

:deep(.van-cell) {
  align-items: center;
  padding: 12px 16px;

  .van-cell__title {
    font-size: 14px;
    color: #323233;
  }
}

:deep(.van-empty) {
  padding: 40px 0;
  background-color: #fff;
  margin-top: 8px;
}

:deep(.van-cell-group--inset) {
  margin: 0 16px;
  border-radius: 8px;
  overflow: hidden;
}
</style>
