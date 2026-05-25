<template>
  <svg
    :viewBox="`0 0 ${size} ${size}`"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      :width="size"
      :height="size"
      rx="6"
      :fill="resolvedBgColor"
    />
    <text
      :x="size / 2"
      :y="size * 0.65"
      text-anchor="middle"
      :font-size="size * 0.5"
      font-weight="bold"
      :fill="resolvedTextColor"
      font-family="Arial, sans-serif"
    >{{ displayLabel }}</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PROVINCE_DEFAULT_COLORS } from './provinceColors'

interface Props {
  provinceName: string
  label?: string
  size?: number
  backgroundColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
})

const resolvedBgColor = computed(() =>
  props.backgroundColor || PROVINCE_DEFAULT_COLORS[props.provinceName]?.bg || '#B0BEC5'
)

const resolvedTextColor = computed(() =>
  props.textColor || PROVINCE_DEFAULT_COLORS[props.provinceName]?.text || '#fff'
)

const displayLabel = computed(() => {
  if (props.label) return props.label

  const nameMap: Record<string, string> = {
    '北京市': '京',
    '天津市': '津',
    '上海市': '沪',
    '重庆市': '渝',
    '内蒙古自治区': '蒙',
    '广西壮族自治区': '桂',
    '西藏自治区': '藏',
    '宁夏回族自治区': '宁',
    '新疆维吾尔自治区': '新',
    '香港特别行政区': '港',
    '澳门特别行政区': '澳',
  }

  if (nameMap[props.provinceName]) {
    return nameMap[props.provinceName]
  }

  const provinceShortMap: Record<string, string> = {
    '河北省': '冀',
    '山西省': '晋',
    '辽宁省': '辽',
    '吉林省': '吉',
    '黑龙江省': '黑',
    '江苏省': '苏',
    '浙江省': '浙',
    '安徽省': '皖',
    '福建省': '闽',
    '江西省': '赣',
    '山东省': '鲁',
    '河南省': '豫',
    '湖北省': '鄂',
    '湖南省': '湘',
    '广东省': '粤',
    '海南省': '琼',
    '四川省': '川',
    '贵州省': '贵',
    '云南省': '云',
    '陕西省': '陕',
    '甘肃省': '甘',
    '青海省': '青',
    '台湾省': '台',
  }

  return provinceShortMap[props.provinceName] || props.provinceName.charAt(0)
})
</script>
