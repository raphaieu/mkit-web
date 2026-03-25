<script setup lang="ts">
import type { Creator } from '~/types/creator'

defineProps<{
  creator: Creator
}>()
</script>

<template>
  <section
    v-if="creator.profile?.contact_email || creator.profile?.contact_whatsapp"
    class="px-5 py-6"
  >
    <div class="mx-auto max-w-md space-y-3">
      <p class="bio-section-title mb-3">Contato para marcas</p>

      <!-- Email — dark navy CTA -->
      <a
        v-if="creator.profile?.contact_email"
        :href="`mailto:${creator.profile.contact_email}`"
        class="group flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200 hover:opacity-90 active:scale-[0.99]"
        style="background: var(--bio-cta-bg); color: var(--bio-cta-text)"
      >
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style="background: rgba(255,255,255,0.1)">
          <svg class="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </span>
        <span class="min-w-0 flex-1 text-left">
          <span class="block text-sm font-medium">Enviar proposta</span>
          <span class="mt-0.5 block text-xs opacity-60">{{ creator.profile.contact_email }}</span>
        </span>
        <svg class="h-4 w-4 opacity-40 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </a>

      <!-- WhatsApp — outlined secondary -->
      <a
        v-if="creator.profile?.contact_whatsapp"
        :href="creator.profile.contact_whatsapp.startsWith('http')
          ? creator.profile.contact_whatsapp
          : `https://wa.me/${creator.profile.contact_whatsapp.replace(/\D/g, '')}`"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-all duration-200 hover:border-gray-300 active:scale-[0.99]"
        style="color: var(--bio-text)"
      >
        <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style="background: #f0faf4">
          <svg class="h-[18px] w-[18px]" style="color: #25d366" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.447.1-.133.197-.514.643-.63.775-.116.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.588-.525-.985-1.175-1.103-1.372-.116-.198-.012-.304.087-.403.089-.088.197-.231.296-.346.099-.116.132-.198.198-.33.066-.134.033-.248-.016-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.116-.007-.248-.007-.38-.007a.729.729 0 0 0-.529.248c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.907.13 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </span>
        <span class="min-w-0 flex-1 text-left">
          <span class="block text-sm font-medium">WhatsApp profissional</span>
          <span class="mt-0.5 block text-xs" style="color: var(--bio-muted)">Responde em até 24h</span>
        </span>
        <svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" style="color: var(--bio-muted)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
      </a>
    </div>
  </section>
</template>
