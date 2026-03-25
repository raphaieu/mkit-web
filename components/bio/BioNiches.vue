<script setup lang="ts">
import type { Creator } from '~/types/creator'

defineProps<{
  creator: Creator
}>()
</script>

<template>
  <section v-if="creator.profile?.niches?.length" class="px-5 py-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-3">Nichos de conteúdo</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in creator.profile.niches"
          :key="tag"
          class="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-medium"
          style="color: var(--bio-sub)"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>
