<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCreatorStore } from '~/stores/creator'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({ title: 'Dashboard | mkit' })

const auth = useAuthStore()
const creator = useCreatorStore()

onMounted(async () => {
  if (auth.user?.handle) {
    await creator.fetchCreator(auth.user.handle)
  }
})

function copyLink() {
  if (!auth.user?.handle) return
  window.navigator.clipboard.writeText(`https://mkit.com.br/@${auth.user.handle}`)
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Olá{{ auth.user ? `, ${auth.user.name}` : '' }} 👋</h1>
      <p class="mt-1 text-sm text-gray-500">Gerencie seu media kit</p>
    </div>

    <DashboardStats v-if="creator.current" :creator="creator.current" />

    <DashboardInstagramInsightsPanel v-if="auth.user?.instagram" />

    <div class="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold">Seu link público</h2>
      </div>
      <div v-if="auth.user?.handle" class="mt-3 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
        <span class="flex-1 text-sm text-gray-700">
          mkit.com.br/@{{ auth.user.handle }}
        </span>
        <button
          class="text-xs font-medium text-brand-600 hover:text-brand-700"
          @click="copyLink"
        >
          Copiar
        </button>
      </div>
    </div>
  </div>
</template>
