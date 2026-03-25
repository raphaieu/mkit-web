<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const brands = computed(() => props.creator.partner_brands ?? [])

const trackRef = ref<HTMLElement | null>(null)
const activeDot = ref(0)
const totalDots = computed(() => {
  if (!trackRef.value || brands.value.length === 0) return 1
  return Math.max(1, Math.ceil(brands.value.length / 3))
})

function onScroll() {
  if (!trackRef.value) return
  const el = trackRef.value
  const scrollableWidth = el.scrollWidth - el.clientWidth
  if (scrollableWidth <= 0) { activeDot.value = 0; return }
  activeDot.value = Math.round((el.scrollLeft / scrollableWidth) * (totalDots.value - 1))
}
</script>

<template>
  <section v-if="brands.length" class="px-5 py-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4">Marcas parceiras</p>
      <div
        ref="trackRef"
        class="bio-scroll-hide flex gap-2 overflow-x-auto scroll-smooth pb-1"
        style="scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch"
        @scroll="onScroll"
      >
        <div
          v-for="b in brands"
          :key="b.id"
          class="flex w-[100px] shrink-0 flex-col items-center rounded-xl border border-gray-200 bg-white p-3.5 text-center"
          style="scroll-snap-align: start"
        >
          <span class="text-2xl" aria-hidden="true">{{ b.emoji ?? '✨' }}</span>
          <span class="mt-2 text-[10px] font-medium leading-tight" style="color: var(--bio-text)">{{ b.name }}</span>
          <span v-if="b.category" class="mt-1 text-[9px]" style="color: var(--bio-muted)">{{ b.category }}</span>
        </div>
      </div>
      <div v-if="totalDots > 1" class="mt-3 flex items-center justify-center gap-1.5">
        <span
          v-for="i in totalDots"
          :key="i"
          class="block h-1 rounded-full transition-all duration-200"
          :class="activeDot === i - 1 ? 'w-3.5' : 'w-1'"
          :style="{ background: activeDot === i - 1 ? 'var(--bio-accent)' : '#ddd' }"
        />
      </div>
    </div>
  </section>
</template>
