<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const posts = computed(() => (props.creator.instagram?.posts ?? []).slice(0, 4))
</script>

<template>
  <section v-if="posts.length" class="px-5 py-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4">Posts recentes</p>
      <div class="grid grid-cols-2 gap-2">
        <a
          v-for="post in posts"
          :key="post.instagram_media_id"
          :href="post.permalink"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative aspect-square overflow-hidden rounded-lg"
          style="background: var(--bio-surface-2)"
        >
          <img
            :src="post.thumbnail_url ?? post.media_url"
            :alt="post.caption ?? ''"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 flex items-center justify-center gap-2.5 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span class="flex items-center gap-1 text-[11px] font-medium text-white">
              <svg class="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 0 1 8 4a3.5 3.5 0 0 1 5.5 3c0 3.5-5.5 7-5.5 7z" /></svg>
              {{ post.like_count }}
            </span>
            <span class="flex items-center gap-1 text-[11px] font-medium text-white">
              <svg class="h-3 w-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1C3.58 1 0 4.134 0 8c0 1.76.717 3.37 1.91 4.61L.64 15.13a.5.5 0 0 0 .6.6l2.52-1.27A8.31 8.31 0 0 0 8 15c4.42 0 8-3.134 8-7s-3.58-7-8-7z" /></svg>
              {{ post.comments_count }}
            </span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
