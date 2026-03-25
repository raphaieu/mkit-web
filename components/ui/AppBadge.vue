<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'default' | 'success' | 'warning' | 'danger'
}>(), {
  variant: 'default',
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variant === 'default' && 'bg-gray-100 text-gray-600',
      variant === 'success' && 'bg-green-50 text-green-700',
      variant === 'warning' && 'bg-yellow-50 text-yellow-700',
      variant === 'danger' && 'bg-red-50 text-red-700',
    ]"
  >
    <slot />
  </span>
</template>
