<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({ title: 'Configurações | mkit' })

const auth = useAuthStore()
const config = useRuntimeConfig()
const instagramAuthUrl = `${config.public.apiBase}/auth/instagram`
const { sync } = useInstagramSync()

const syncing = ref(false)
const syncMessage = ref<string | null>(null)

async function runSync() {
  syncing.value = true
  syncMessage.value = null
  try {
    await sync()
    syncMessage.value = 'Sincronização enfileirada.'
    await auth.fetchUser()
  }
  catch {
    syncMessage.value = 'Não foi possível sincronizar.'
  }
  finally {
    syncing.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Configurações</h1>
      <p class="mt-1 text-sm text-gray-500">Gerencie sua conta e integrações</p>
    </div>

    <div class="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
      <h2 class="font-semibold">Instagram</h2>
      <p class="mt-1 text-sm text-gray-500">
        Status da conexão com sua conta do Instagram.
      </p>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <span
          :class="[
            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
            auth.user?.instagram
              ? 'bg-green-50 text-green-700'
              : 'bg-yellow-50 text-yellow-700',
          ]"
        >
          {{ auth.user?.instagram ? 'Conectado' : 'Desconectado' }}
        </span>
        <a
          :href="instagramAuthUrl"
          class="text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          Reconectar
        </a>
        <AppButton
          type="button"
          variant="secondary"
          :loading="syncing"
          :disabled="!auth.user?.instagram"
          @click="runSync"
        >
          Sincronizar dados
        </AppButton>
      </div>
      <p v-if="syncMessage" class="mt-3 text-sm text-gray-600">{{ syncMessage }}</p>
    </div>
  </div>
</template>
