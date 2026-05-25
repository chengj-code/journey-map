<template>
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
  >
    <rect width="32" height="32" rx="6" fill="#B2EBF2"/>
    <text
      x="16"
      y="21"
      text-anchor="middle"
      font-size="16"
      font-weight="bold"
      fill="#006064"
      font-family="Arial, sans-serif"
    >川</text>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  size?: number
}>()
</script>