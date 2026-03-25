<script setup lang="ts">
defineProps<{
  padding?: 'none' | 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    :class="[
      'rounded-xl border border-gray-200 bg-white',
      padding === 'none' ? '' : padding === 'sm' ? 'p-3' : padding === 'lg' ? 'p-8' : 'p-4 md:p-6',
    ]"
  >
    <slot />
  </div>
</template>
