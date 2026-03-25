<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
}>(), {
  type: 'button',
  loading: false,
  disabled: false,
  variant: 'primary',
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary' &&
        'border border-gray-900 bg-gray-900 text-white hover:bg-gray-800',
      variant === 'secondary' &&
        'border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-50',
      variant === 'ghost' &&
        'border border-transparent bg-transparent text-gray-700 shadow-none hover:bg-gray-100',
    ]"
  >
    <span
      v-if="loading"
      :class="[
        'mr-2 h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-t-transparent',
        variant === 'primary' ? 'border-white' : 'border-gray-900',
      ]"
    />
    <slot />
  </button>
</template>
