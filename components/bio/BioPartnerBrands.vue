<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const brands = computed(() => props.creator.partner_brands ?? [])
</script>

<template>
  <section v-if="brands.length" class="mt-10 px-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4 tracking-[0.1em]">
        Marcas parceiras
      </p>
      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="b in brands"
          :key="b.id"
          class="flex flex-col items-center rounded-2xl border border-stone-100 bg-white px-3 py-5 text-center transition-all duration-200 hover:border-[color:var(--bio-accent-200)] hover:shadow-sm"
        >
          <span v-if="b.emoji" class="mb-3 text-2xl leading-none" aria-hidden="true">{{ b.emoji }}</span>
          <div
            v-else
            class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-sm font-semibold text-stone-500"
            aria-hidden="true"
          >
            {{ b.name.charAt(0).toUpperCase() }}
          </div>
          <span class="text-xs font-medium text-gray-900">{{ b.name }}</span>
          <span v-if="b.category" class="mt-0.5 text-[10px] text-gray-400">{{ b.category }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
