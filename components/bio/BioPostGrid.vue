<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const posts = computed(() => (props.creator.instagram?.posts ?? []).slice(0, 4))

const instagramUrl = computed(() => {
  const u = props.creator.instagram?.username
  return u ? `https://www.instagram.com/${u}/` : null
})

function postTypeLabel(mediaType: string): string | null {
  const t = mediaType.toUpperCase()
  if (t === 'IMAGE') return null
  if (t.includes('REEL')) return 'Reel'
  if (t === 'CAROUSEL_ALBUM' || t === 'CAROUSEL') return 'Carousel'
  if (t === 'VIDEO') return 'Vídeo'
  return mediaType
}
</script>

<template>
  <section v-if="posts.length" class="mt-10 px-6">
    <div class="mx-auto max-w-md">
      <p class="bio-section-title mb-4 tracking-[0.1em]">
        Posts recentes
      </p>
      <div class="grid grid-cols-2 gap-2">
        <a
          v-for="post in posts"
          :key="post.instagram_media_id"
          :href="post.permalink"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative aspect-square overflow-hidden rounded-xl bg-stone-100"
        >
          <img
            :src="post.thumbnail_url ?? post.media_url"
            :alt="post.caption ?? ''"
            class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          >
          <div
            class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40"
          >
            <div
              class="flex items-center gap-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <span class="flex items-center gap-1">
                <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 0 1 8 4a3.5 3.5 0 0 1 5.5 3c0 3.5-5.5 7-5.5 7z" />
                </svg>
                {{ post.like_count }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1C3.58 1 0 4.134 0 8c0 1.76.717 3.37 1.91 4.61L.64 15.13a.5.5 0 0 0 .6.6l2.52-1.27A8.31 8.31 0 0 0 8 15c4.42 0 8-3.134 8-7s-3.58-7-8-7z" />
                </svg>
                {{ post.comments_count }}
              </span>
            </div>
          </div>
          <div
            v-if="postTypeLabel(post.media_type)"
            class="absolute right-2 top-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
          >
            {{ postTypeLabel(post.media_type) }}
          </div>
        </a>
      </div>
      <a
        v-if="instagramUrl"
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mt-3 block w-full py-2.5 text-center text-xs font-medium text-gray-500 transition-colors hover:text-[color:var(--bio-accent-600)]"
      >
        Ver todos os posts →
      </a>
    </div>
  </section>
</template>
