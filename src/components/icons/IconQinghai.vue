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
      :fill="backgroundColor || '#C8E6C9'"
    />
    <text
      :x="size / 2"
      :y="size * 0.65"
      text-anchor="middle"
      :font-size="size * 0.5"
      font-weight="bold"
      :fill="textColor || '#1B5E20'"
      font-family="Arial, sans-serif"
    >青</text>
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  backgroundColor?: string
  textColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 32,
})
</script>
