<template>
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <rect width="32" height="32" rx="6" fill="#81D4FA"/>
    <text
      x="16"
      y="21"
      text-anchor="middle"
      font-size="16"
      font-weight="bold"
      fill="#01579B"
      font-family="Arial, sans-serif"
    >黑</text>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>