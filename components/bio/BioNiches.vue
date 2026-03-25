<script setup lang="ts">
import type { Creator } from '~/types/creator'

defineProps<{
  creator: Creator
}>()
</script>

<template>
  <section v-if="creator.profile?.niches?.length" class="mt-10 px-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4 tracking-[0.1em]">
        Nichos de conteúdo
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in creator.profile.niches"
          :key="tag"
          class="cursor-default rounded-full border border-stone-200/90 bg-stone-50 px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-colors duration-200 hover:border-[color:var(--bio-accent-200)] hover:bg-[color:var(--bio-accent-50)] hover:text-[color:var(--bio-accent-700)]"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </section>
</template>
