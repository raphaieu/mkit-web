<script setup lang="ts">
import type { PortfolioItemPayload } from '~/types/portfolio'

const emit = defineEmits<{
  created: []
}>()

const portfolio = usePortfolio()

const form = reactive<PortfolioItemPayload>({
  title: '',
  description: null,
  image_url: null,
  partner_name: null,
  collaboration_type: null,
  reach: null,
  engagement_rate_text: null,
  deliverables: null,
  published_at: null,
})

const loading = ref(false)
const error = ref<string | null>(null)

async function submit() {
  if (!form.title.trim()) return

  loading.value = true
  error.value = null

  try {
    await portfolio.create({ ...form })
    form.title = ''
    form.description = null
    form.image_url = null
    form.partner_name = null
    form.collaboration_type = null
    form.reach = null
    form.engagement_rate_text = null
    form.deliverables = null
    form.published_at = null
    emit('created')
  }
  catch {
    error.value = 'Erro ao salvar. Tente novamente.'
  }
  finally {
    loading.value = false
  }
}

const inputClass =
  'mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none'
const labelClass = 'block text-xs font-medium text-gray-500'
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white p-4 md:p-6">
    <h2 class="font-semibold">Adicionar trabalho</h2>
    <form class="mt-4 space-y-4" @submit.prevent="submit">
      <div>
        <label :class="labelClass">Título *</label>
        <input
          v-model="form.title"
          type="text"
          :class="inputClass"
          placeholder="Nome da campanha ou trabalho"
          required
        >
      </div>
      <div>
        <label :class="labelClass">Marca / Parceiro</label>
        <input
          v-model="form.partner_name"
          type="text"
          :class="inputClass"
          placeholder="Ex: Nike, Netshoes"
        >
      </div>
      <div>
        <label :class="labelClass">Tipo de colaboração</label>
        <input
          v-model="form.collaboration_type"
          type="text"
          :class="inputClass"
          placeholder="Ex: UGC · Reels"
        >
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label :class="labelClass">Alcance (texto)</label>
          <input v-model="form.reach" type="text" :class="inputClass" placeholder="8,2k">
        </div>
        <div>
          <label :class="labelClass">Engajamento (texto)</label>
          <input v-model="form.engagement_rate_text" type="text" :class="inputClass" placeholder="6,1%">
        </div>
      </div>
      <div>
        <label :class="labelClass">Entregáveis</label>
        <input v-model="form.deliverables" type="text" :class="inputClass" placeholder="Stories 12, Reels 3…">
      </div>
      <div>
        <label :class="labelClass">Descrição</label>
        <textarea
          v-model="form.description"
          rows="3"
          :class="inputClass"
          placeholder="Descreva brevemente o trabalho"
        />
      </div>
      <div>
        <label :class="labelClass">URL da imagem</label>
        <input
          v-model="form.image_url"
          type="url"
          :class="inputClass"
          placeholder="https://..."
        >
      </div>
      <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
      <AppButton type="submit" :loading="loading">
        Adicionar
      </AppButton>
    </form>
  </div>
</template>
