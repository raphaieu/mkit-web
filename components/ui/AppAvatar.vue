<script setup lang="ts">
withDefaults(defineProps<{
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>(), {
  src: null,
  alt: '',
  size: 'md',
})
</script>

<template>
  <div
    :class="[
      'overflow-hidden rounded-full bg-gray-200',
      size === 'sm' && 'h-8 w-8',
      size === 'md' && 'h-10 w-10',
      size === 'lg' && 'h-16 w-16',
      size === 'xl' && 'h-24 w-24 md:h-28 md:w-28',
    ]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      class="h-full w-full object-cover"
    >
    <div v-else class="flex h-full w-full items-center justify-center text-gray-400">
      <span class="text-lg font-medium">{{ alt?.charAt(0)?.toUpperCase() }}</span>
    </div>
  </div>
</template>
