<script setup lang="ts">
import type { AuthUser } from '~/stores/auth'

defineProps<{
  user: AuthUser | null
}>()

const auth = useAuthStore()
const { sync } = useInstagramSync()

const syncing = ref(false)
const syncMessage = ref<string | null>(null)

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

async function runSync() {
  syncing.value = true
  syncMessage.value = null
  try {
    await sync()
    syncMessage.value = 'Sincronização enfileirada. Os dados atualizam em instantes.'
    await auth.fetchUser()
  }
  catch {
    syncMessage.value = 'Não foi possível iniciar a sincronização.'
  }
  finally {
    syncing.value = false
  }
}
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2">
    <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p class="text-xs font-medium text-gray-400">Nome</p>
      <p class="mt-1 text-sm text-gray-900">
        {{ user?.name ?? '—' }}
      </p>
    </div>
    <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p class="text-xs font-medium text-gray-400">@ handle</p>
      <p class="mt-1 text-sm text-gray-900">
        {{ user?.handle ? `@${user.handle}` : '—' }}
      </p>
    </div>
    <div class="sm:col-span-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p class="text-xs font-medium text-gray-400">Bio</p>
      <p class="mt-1 text-sm leading-relaxed text-gray-700">
        {{ user?.instagram?.biography ?? '—' }}
      </p>
    </div>
    <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p class="text-xs font-medium text-gray-400">Seguidores</p>
      <p class="mt-1 text-lg font-semibold text-gray-900">
        {{ user?.instagram ? formatNumber(user.instagram.followers_count) : '—' }}
      </p>
    </div>
    <div class="rounded-lg border border-gray-100 bg-gray-50 p-3">
      <p class="text-xs font-medium text-gray-400">Posts (mídias)</p>
      <p class="mt-1 text-lg font-semibold text-gray-900">
        {{ user?.instagram?.media_count ?? '—' }}
      </p>
    </div>
  </div>
  <div class="mt-4 flex flex-wrap items-center gap-3">
    <AppButton
      type="button"
      variant="secondary"
      :loading="syncing"
      :disabled="!user?.instagram"
      @click="runSync"
    >
      Sincronizar Instagram
    </AppButton>
    <span v-if="syncMessage" class="text-xs text-gray-500">{{ syncMessage }}</span>
  </div>
  <p class="mt-4 text-xs text-gray-400">
    Alcance, impressões e audiência detalhada virão da API do Instagram / insights quando estiverem disponíveis.
  </p>
</template>
