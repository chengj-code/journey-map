<template>
  <svg
    :viewBox="`0 0 ${size} ${size}`"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <rect
      :width="size"
      :height="size"
      rx="6"
      :fill="finalBgColor"
    />
    <text
      :x="size / 2"
      :y="size * 0.65"
      text-anchor="middle"
      :font-size="size * 0.5"
      font-weight="bold"
      :fill="finalTextColor"
      font-family="Arial, sans-serif"
    >{{ label }}</text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DEFAULT_COLORS } from './defaultColors'

interface Props {
  provinceName: string
  label: string
  size?: number
  backgroundColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
})

const finalBgColor = computed(() => {
  return props.backgroundColor || DEFAULT_COLORS[props.provinceName]?.bg || '#E0E0E0'
})

const finalTextColor = computed(() => {
  return props.textColor || DEFAULT_COLORS[props.provinceName]?.text || '#333'
})
</script>
