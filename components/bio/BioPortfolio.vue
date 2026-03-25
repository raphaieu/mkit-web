<script setup lang="ts">
import type { Creator } from '~/types/creator'

const props = defineProps<{
  creator: Creator
}>()

const items = computed(() => props.creator.experiences ?? [])

function collaborationTagClass(raw: string | null | undefined): string {
  if (!raw) return 'bg-stone-100 text-stone-600'
  const t = raw.toLowerCase()
  if (t.includes('ugc')) return 'bg-blue-50 text-blue-700'
  if (t.includes('reel')) return 'bg-purple-50 text-purple-700'
  if (t.includes('stor')) return 'bg-amber-50 text-amber-700'
  if (t.includes('post')) return 'bg-stone-100 text-stone-600'
  return 'bg-stone-100 text-stone-600'
}
</script>

<template>
  <section v-if="items.length" class="mt-10 px-6">
    <div class="mx-auto max-w-md space-y-4">
      <p class="bio-section-title tracking-[0.1em]">
        Experiências com marcas
      </p>
      <article
        v-for="item in items"
        :key="item.id"
        class="overflow-hidden rounded-2xl border border-stone-100 bg-white transition-all duration-200 hover:border-[color:var(--bio-accent-200)] hover:shadow-sm"
      >
        <div v-if="item.image_url" class="aspect-[4/5] max-h-72 w-full overflow-hidden bg-stone-50">
          <img
            :src="item.image_url"
            :alt="item.title"
            class="h-full w-full object-cover"
            loading="lazy"
          >
        </div>

        <div class="p-5">
          <div class="mb-2 flex items-start justify-between gap-2">
            <span
              v-if="item.partner_name"
              class="text-xs font-semibold uppercase tracking-wide text-gray-900"
            >
              {{ item.partner_name }}
            </span>
            <span
              v-if="item.collaboration_type"
              class="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
              :class="collaborationTagClass(item.collaboration_type)"
            >
              {{ item.collaboration_type }}
            </span>
          </div>

          <h3 class="text-sm font-medium text-gray-900">
            {{ item.title }}
          </h3>
          <p v-if="item.description" class="mt-1 text-xs text-gray-400">
            {{ item.description }}
          </p>

          <div
            v-if="item.reach || item.engagement_rate_text || item.deliverables"
            class="mt-4 flex flex-wrap items-center gap-4 border-t border-stone-100 pt-4"
          >
            <div v-if="item.reach" class="min-w-0">
              <div class="text-sm font-semibold tabular-nums text-gray-900">
                {{ item.reach }}
              </div>
              <div class="text-[10px] uppercase tracking-wider text-gray-400">
                Alcance
              </div>
            </div>
            <div v-if="item.reach && item.engagement_rate_text" class="h-8 w-px shrink-0 bg-stone-100" />
            <div v-if="item.engagement_rate_text" class="min-w-0">
              <div class="text-sm font-semibold tabular-nums text-gray-900">
                {{ item.engagement_rate_text }}
              </div>
              <div class="text-[10px] uppercase tracking-wider text-gray-400">
                Engaj.
              </div>
            </div>
            <div
              v-if="item.deliverables && (item.reach || item.engagement_rate_text)"
              class="h-8 w-px shrink-0 bg-stone-100"
            />
            <div v-if="item.deliverables" class="min-w-0 flex-1 text-xs text-gray-500">
              {{ item.deliverables }}
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
