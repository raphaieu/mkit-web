<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

type Entry = { key: string; label: string; url: string; icon: string }

const ICONS: Record<string, string> = {
  ig: 'M8 0C5.827 0 5.556.01 4.703.048 3.85.088 3.27.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.27.087 3.85.048 4.703.01 5.556 0 5.827 0 8s.01 2.444.048 3.297c.04.852.174 1.433.372 1.942.205.526.478.973.923 1.417.444.445.89.719 1.417.923.51.198 1.09.333 1.942.372C5.556 15.99 5.827 16 8 16s2.444-.01 3.297-.048c.852-.04 1.433-.174 1.942-.372a3.916 3.916 0 0 0 1.417-.923c.445-.444.719-.89.923-1.417.198-.51.333-1.09.372-1.942C15.99 10.444 16 10.173 16 8s-.01-2.444-.048-3.297c-.04-.852-.174-1.433-.372-1.942a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42C12.73.222 12.15.087 11.297.048 10.444.01 10.173 0 8 0zm0 1.44c2.136 0 2.39.009 3.233.047.78.036 1.203.166 1.485.276.373.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.009 2.39-.047 3.233c-.036.78-.166 1.203-.276 1.485-.145.373-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.598-.92c-.11-.282-.24-.705-.276-1.485C1.45 10.39 1.44 10.136 1.44 8s.009-2.39.047-3.233c.036-.78.166-1.203.276-1.485.145-.373.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276C5.61 1.45 5.864 1.44 8 1.44zm0 2.452a4.108 4.108 0 1 0 0 8.215 4.108 4.108 0 0 0 0-8.215zm0 6.775a2.667 2.667 0 1 1 0-5.334 2.667 2.667 0 0 1 0 5.334zm5.23-6.937a.96.96 0 1 1-1.92 0 .96.96 0 0 1 1.92 0z',
  tt: 'M9.37.608a.751.751 0 0 1 .75-.608h1.634c.415 0 .75.336.75.75v.862c0 1.814 1.476 3.29 3.29 3.29h.456a.75.75 0 0 1 .75.75v1.634a.75.75 0 0 1-.75.75h-.456a6.533 6.533 0 0 1-3.29-.888v4.476a5.724 5.724 0 1 1-5.724-5.724.75.75 0 0 1 .75.75v1.822a.75.75 0 0 1-.642.743 2.49 2.49 0 1 0 2.9 2.456V.608z',
  yt: 'M15.841 4.253a2.01 2.01 0 0 0-1.414-1.423C13.17 2.5 8 2.5 8 2.5s-5.17 0-6.427.33A2.01 2.01 0 0 0 .159 4.253C0 5.517 0 8 0 8s0 2.483.159 3.747a2.01 2.01 0 0 0 1.414 1.423C2.83 13.5 8 13.5 8 13.5s5.17 0 6.427-.33a2.01 2.01 0 0 0 1.414-1.423C16 10.483 16 8 16 8s0-2.483-.159-3.747zM6.4 10.5V5.5L10.667 8 6.4 10.5z',
  pi: 'M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.298.146-.625.938-3.977.938-3.977s-.24-.479-.24-1.187c0-1.113.645-1.943 1.448-1.943.683 0 1.012.512 1.012 1.127 0 .687-.437 1.713-.662 2.664-.188.796.4 1.446 1.185 1.446 1.42 0 2.514-1.498 2.514-3.662 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.472 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.835-4.84 5.287-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z',
  x: 'M12.6.75h2.454l-5.36 6.126L16 15.25h-4.937l-3.867-5.056-4.425 5.056H.316l5.733-6.554L0 .75h5.063l3.495 4.622L12.601.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z',
}

const entries = computed((): Entry[] => {
  const list: Entry[] = []
  const igUser = props.creator.instagram?.username
  const manualIg = props.creator.profile?.social?.instagram
  if (manualIg) list.push({ key: 'ig', label: 'Instagram', url: manualIg, icon: ICONS.ig })
  else if (igUser) list.push({ key: 'ig', label: 'Instagram', url: `https://www.instagram.com/${igUser}/`, icon: ICONS.ig })

  const s = props.creator.profile?.social
  if (!s) return list
  if (s.tiktok) list.push({ key: 'tt', label: 'TikTok', url: s.tiktok, icon: ICONS.tt })
  if (s.youtube) list.push({ key: 'yt', label: 'YouTube', url: s.youtube, icon: ICONS.yt })
  if (s.pinterest) list.push({ key: 'pi', label: 'Pinterest', url: s.pinterest, icon: ICONS.pi })
  if (s.twitter) list.push({ key: 'x', label: 'X', url: s.twitter, icon: ICONS.x })

  return list
})
</script>

<template>
  <section v-if="entries.length" class="mt-10 px-6 pb-2">
    <div class="mx-auto max-w-md text-center">
      <p class="mb-4 text-[11px] font-medium uppercase tracking-[0.1em] text-gray-300">
        Redes sociais
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <a
          v-for="e in entries"
          :key="e.key"
          :href="e.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200/90 text-gray-400 transition-all duration-200 hover:border-[color:var(--bio-accent-200)] hover:bg-[color:var(--bio-accent-50)] hover:text-[color:var(--bio-accent-600)]"
          :title="e.label"
        >
          <svg class="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path :d="e.icon" />
          </svg>
          <span class="sr-only">{{ e.label }}</span>
        </a>
      </div>
    </div>
  </section>
</template>
