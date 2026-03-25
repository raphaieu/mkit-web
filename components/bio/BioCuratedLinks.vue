<script setup lang="ts">
import type { Creator } from '~/types/creator'

defineProps<{
  creator: Creator
}>()
</script>

<template>
  <section v-if="creator.links?.length" class="mt-10 px-6">
    <div class="mx-auto max-w-md space-y-2.5">
      <p class="bio-section-title mb-3 tracking-[0.1em]">
        Links
      </p>
      <a
        v-for="link in creator.links"
        :key="link.id"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-4 rounded-2xl border border-stone-100 bg-white px-5 py-4 text-gray-900 transition-all duration-200 hover:border-[color:var(--bio-accent-200)] hover:shadow-sm active:scale-[0.99]"
      >
        <span
          v-if="link.emoji"
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-stone-50 text-base"
          aria-hidden="true"
        >{{ link.emoji }}</span>
        <span
          v-else
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style="background: var(--bio-accent-50)"
        >
          <svg
            class="h-4 w-4"
            style="color: var(--bio-accent-600)"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </span>
        <span class="min-w-0 flex-1 text-left">
          <span class="block text-sm font-medium">{{ link.title }}</span>
          <span v-if="link.description" class="mt-0.5 block truncate text-xs text-gray-400">{{ link.description }}</span>
        </span>
        <svg
          class="h-4 w-4 shrink-0 text-gray-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[color:var(--bio-accent-500)]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </div>
  </section>
</template>
