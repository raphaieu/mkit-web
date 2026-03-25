<script setup lang="ts">
import type { BioDataSource } from '~/types/creator'

const props = defineProps<{
  source: BioDataSource
}>()

const label = computed(() => {
  switch (props.source) {
    case 'api':
      return 'API'
    case 'manual':
      return 'Manual'
    case 'calc':
      return 'Calc'
    default:
      return ''
  }
})

const classes = computed(() => {
  switch (props.source) {
    case 'api':
      return 'border-blue-200 bg-blue-50 text-blue-700'
    case 'manual':
      return 'border-emerald-200 bg-emerald-50 text-emerald-700'
    case 'calc':
      return 'border-amber-200 bg-amber-50 text-amber-800'
    default:
      return ''
  }
})
</script>

<template>
  <span
    class="inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
    :class="classes"
  >
    {{ label }}
  </span>
</template>
