<template>
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <rect width="32" height="32" rx="6" fill="#FFF59D"/>
    <text
      x="16"
      y="21"
      text-anchor="middle"
      font-size="16"
      font-weight="bold"
      fill="#F57F17"
      font-family="Arial, sans-serif"
    >澳</text>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>