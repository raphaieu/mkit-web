<script setup lang="ts">
import type { Creator } from '~/types/creator'

defineProps<{
  creator: Creator
}>()
</script>

<template>
  <header class="flex flex-col items-center px-6 pb-6 pt-8 text-center md:pt-10">
    <div
      class="relative mb-4 rounded-full ring-2 ring-offset-2 ring-offset-stone-50"
      style="--tw-ring-color: var(--bio-accent-200)"
    >
      <UiAppAvatar
        :src="creator.instagram?.profile_picture_url"
        :alt="creator.name"
        size="xl"
        class="!h-24 !w-24 shrink-0 md:!h-28 md:!w-28"
      />
    </div>

    <h1 class="text-2xl font-semibold tracking-tight text-gray-900">
      {{ creator.instagram?.full_name ?? creator.name }}
    </h1>

    <p
      v-if="creator.instagram?.username || creator.profile?.city"
      class="mt-1 text-sm text-gray-400"
    >
      <span v-if="creator.instagram?.username">@{{ creator.instagram.username }}</span>
      <span v-if="creator.instagram?.username && creator.profile?.city"> · </span>
      <span v-if="creator.profile?.city">{{ creator.profile.city }}</span>
    </p>

    <div
      v-if="creator.profile?.badges?.length"
      class="mt-3 flex flex-wrap justify-center gap-2"
    >
      <span
        v-for="badge in creator.profile.badges"
        :key="badge"
        class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium"
        style="background: var(--bio-accent-50); color: var(--bio-accent-700); border-color: var(--bio-accent-200)"
      >
        {{ badge }}
      </span>
    </div>

    <p
      v-if="creator.instagram?.biography"
      class="mt-4 max-w-xs text-sm leading-relaxed text-gray-600"
    >
      {{ creator.instagram.biography }}
    </p>
  </header>
</template>
