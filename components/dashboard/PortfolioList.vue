<script setup lang="ts">
import type { PortfolioItem } from '~/types/creator'

const portfolio = usePortfolio()

const items = ref<PortfolioItem[]>([])
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    items.value = await portfolio.list()
  }
  finally {
    loading.value = false
  }
}

async function remove(id: number) {
  await portfolio.remove(id)
  items.value = items.value.filter(i => i.id !== id)
}

defineExpose({ load })

onMounted(load)
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
    <h2 class="font-semibold">Seus trabalhos</h2>

    <div v-if="loading" class="mt-4 text-sm text-gray-400">Carregando...</div>

    <div v-else-if="!items.length" class="mt-4 text-sm text-gray-400">
      Nenhum trabalho adicionado ainda.
    </div>

    <ul v-else class="mt-4 divide-y divide-gray-100">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-start gap-3 py-3"
      >
        <img
          v-if="item.image_url"
          :src="item.image_url"
          :alt="item.title"
          class="h-12 w-12 rounded-lg object-cover"
        >
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-medium text-gray-900">{{ item.title }}</p>
          <p v-if="item.partner_name" class="text-xs text-gray-400">{{ item.partner_name }}</p>
          <p v-if="item.collaboration_type" class="text-xs text-gray-500">{{ item.collaboration_type }}</p>
          <p v-if="item.reach || item.engagement_rate_text" class="mt-1 text-xs text-gray-500">
            <span v-if="item.reach">Alcance {{ item.reach }}</span>
            <span v-if="item.reach && item.engagement_rate_text"> · </span>
            <span v-if="item.engagement_rate_text">Engaj. {{ item.engagement_rate_text }}</span>
          </p>
        </div>
        <button
          class="text-xs text-red-400 transition-colors hover:text-red-600"
          @click="remove(item.id)"
        >
          Remover
        </button>
      </li>
    </ul>
  </div>
</template>
