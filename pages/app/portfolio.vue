<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({ title: 'Portfólio | mkit' })

const listRef = ref<{ load: () => Promise<void> } | null>(null)

function onCreated() {
  listRef.value?.load()
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold">Portfólio</h1>
      <p class="mt-1 text-sm text-gray-500">Gerencie seus últimos trabalhos</p>
    </div>

    <DashboardPortfolioForm @created="onCreated" />
    <DashboardPortfolioList ref="listRef" />
  </div>
</template>
