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
            <component :is="getProvinceIcon(item.name)" class="icon" />
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
import type { Component } from 'vue'
import { useMapStore } from '@/store'
import {
  IconBeijing,
  IconTianjin,
  IconShanghai,
  IconChongqing,
  IconHebei,
  IconShanxi,
  IconLiaoning,
  IconJilin,
  IconHeilongjiang,
  IconJiangsu,
  IconZhejiang,
  IconAnhui,
  IconFujian,
  IconJiangxi,
  IconShandong,
  IconHenan,
  IconHubei,
  IconHunan,
  IconGuangdong,
  IconHainan,
  IconSichuan,
  IconGuizhou,
  IconYunnan,
  IconShaanxi,
  IconGansu,
  IconQinghai,
  IconTaiwan,
  IconInnerMongolia,
  IconGuangxi,
  IconTibet,
  IconNingxia,
  IconXinjiang,
  IconHongKong,
  IconMacau,
} from '@/components/icons'

const mapStore = useMapStore()

const provinceData = computed(() => mapStore.provinceData.filter(item => item.selected))
const cityData = computed(() => mapStore.cityData.filter(item => item.selected))

const provinceCount = computed(() => provinceData.value.length)
const cityCount = computed(() => cityData.value.length)

const provinceIconMap: Record<string, Component> = {
  '北京市': IconBeijing,
  '天津市': IconTianjin,
  '上海市': IconShanghai,
  '重庆市': IconChongqing,
  '河北省': IconHebei,
  '山西省': IconShanxi,
  '辽宁省': IconLiaoning,
  '吉林省': IconJilin,
  '黑龙江省': IconHeilongjiang,
  '江苏省': IconJiangsu,
  '浙江省': IconZhejiang,
  '安徽省': IconAnhui,
  '福建省': IconFujian,
  '江西省': IconJiangxi,
  '山东省': IconShandong,
  '河南省': IconHenan,
  '湖北省': IconHubei,
  '湖南省': IconHunan,
  '广东省': IconGuangdong,
  '海南省': IconHainan,
  '四川省': IconSichuan,
  '贵州省': IconGuizhou,
  '云南省': IconYunnan,
  '陕西省': IconShaanxi,
  '甘肃省': IconGansu,
  '青海省': IconQinghai,
  '台湾省': IconTaiwan,
  '内蒙古自治区': IconInnerMongolia,
  '广西壮族自治区': IconGuangxi,
  '西藏自治区': IconTibet,
  '宁夏回族自治区': IconNingxia,
  '新疆维吾尔自治区': IconXinjiang,
  '香港特别行政区': IconHongKong,
  '澳门特别行政区': IconMacau,
}

const getProvinceIcon = (name: string): Component => {
  return provinceIconMap[name] || IconBeijing
}
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
