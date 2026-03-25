<script setup lang="ts">
import type { Creator } from '~/types/creator'

defineProps<{
  creator: Creator
}>()
</script>

<template>
  <header class="px-5 pb-8 pt-10 md:pt-14">
    <div class="mx-auto max-w-md">
      <!-- avatar + info row -->
      <div class="flex gap-4">
        <UiAppAvatar
          :src="creator.instagram?.profile_picture_url"
          :alt="creator.name"
          size="xl"
          class="relative h-20 w-20 shrink-0 rounded-full ring-2 ring-(--bio-accent) md:h-24 md:w-24"
        />

        <div class="min-w-0 flex-1 pt-1 text-left">
          <h1
            class="text-xl font-medium leading-tight md:text-2xl"
            style="color: var(--bio-text)"
          >
            {{ creator.name }}
          </h1>

          <p
            v-if="creator.instagram?.username || creator.profile?.city"
            class="mt-1 text-[13px]"
            style="color: var(--bio-muted)"
          >
            <span v-if="creator.instagram?.username">@{{ creator.instagram.username }}</span>
            <span v-if="creator.instagram?.username && creator.profile?.city"> · </span>
            <span v-if="creator.profile?.city">{{ creator.profile.city }}</span>
          </p>

          <div
            v-if="creator.profile?.badges?.length"
            class="mt-2.5 flex flex-wrap gap-1.5"
          >
            <span
              v-for="badge in creator.profile.badges"
              :key="badge"
              class="rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide"
              style="background: var(--bio-accent); color: #ffffff"
            >
              {{ badge }}
            </span>
          </div>
        </div>
      </div>

      <!-- bio text -->
      <p
        v-if="creator.instagram?.biography"
        class="mt-5 text-[13px] leading-relaxed"
        style="color: var(--bio-sub)"
      >
        {{ creator.instagram.biography }}
      </p>
    </div>
  </header>
</template>
