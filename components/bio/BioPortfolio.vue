<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const items = computed(() => props.creator.experiences ?? [])
</script>

<template>
  <section v-if="items.length" class="px-5 py-6">
    <div class="mx-auto max-w-md space-y-3">
      <p class="bio-section-title">Experiências com marcas</p>
      <article
        v-for="item in items"
        :key="item.id"
        class="overflow-hidden rounded-xl border border-gray-200 bg-white"
      >
        <!-- media top -->
        <img
          v-if="item.image_url"
          :src="item.image_url"
          :alt="item.title"
          class="h-44 w-full object-cover"
          loading="lazy"
        >
        <!-- divider between media and data -->
        <div v-if="item.image_url" class="h-px bg-gray-100" />
        <!-- data bottom -->
        <div class="p-4">
          <div class="flex items-start justify-between gap-2">
            <p v-if="item.partner_name" class="text-[10px] font-medium uppercase tracking-widest" style="color: var(--bio-accent)">
              {{ item.partner_name }}
            </p>
            <span v-if="item.collaboration_type" class="shrink-0 rounded-full border border-gray-200 px-2 py-0.5 text-[9px] font-medium" style="color: var(--bio-muted)">
              {{ item.collaboration_type }}
            </span>
          </div>
          <h3 class="mt-2 text-[13px] font-medium leading-snug" style="color: var(--bio-text)">{{ item.title }}</h3>
          <p v-if="item.description" class="mt-2 text-xs leading-relaxed" style="color: var(--bio-sub)">{{ item.description }}</p>
          <div v-if="item.reach || item.engagement_rate_text || item.deliverables" class="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px]" style="color: var(--bio-muted)">
            <span v-if="item.reach">Alcance <strong class="font-medium" style="color: var(--bio-sub)">{{ item.reach }}</strong></span>
            <span v-if="item.engagement_rate_text">Engaj. <strong class="font-medium" style="color: var(--bio-sub)">{{ item.engagement_rate_text }}</strong></span>
            <span v-if="item.deliverables">{{ item.deliverables }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
