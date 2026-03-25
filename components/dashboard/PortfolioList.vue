<script setup lang="ts">
import type { PortfolioItem } from '~/types/creator'
import type { PortfolioItemPayload } from '~/types/portfolio'

const portfolio = usePortfolio()

const items = ref<PortfolioItem[]>([])
const loading = ref(true)
const editingId = ref<number | null>(null)
const editForm = reactive<PortfolioItemPayload>({
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
const saving = ref(false)

async function load() {
  loading.value = true
  try {
    items.value = await portfolio.list()
  }
  finally {
    loading.value = false
  }
}

function startEdit(item: PortfolioItem) {
  editingId.value = item.id
  editForm.title = item.title
  editForm.description = item.description
  editForm.image_url = item.image_url
  editForm.partner_name = item.partner_name
  editForm.collaboration_type = item.collaboration_type
  editForm.reach = item.reach
  editForm.engagement_rate_text = item.engagement_rate_text
  editForm.deliverables = item.deliverables
  editForm.published_at = item.published_at
}

function cancelEdit() {
  editingId.value = null
}

async function saveEdit(id: number) {
  saving.value = true
  try {
    const updated = await portfolio.update(id, { ...editForm })
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) items.value[idx] = updated
    editingId.value = null
  }
  finally {
    saving.value = false
  }
}

async function move(index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= items.value.length) return
  const copy = [...items.value]
  ;[copy[index], copy[target]] = [copy[target]!, copy[index]!]
  items.value = copy
  await portfolio.reorder(copy.map(i => i.id))
}

async function remove(id: number) {
  await portfolio.remove(id)
  items.value = items.value.filter(i => i.id !== id)
}

defineExpose({ load })

onMounted(load)

const inputClass = 'mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none'
const labelClass = 'block text-xs font-medium text-gray-500'
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
        v-for="(item, index) in items"
        :key="item.id"
        class="py-3"
      >
        <!-- Edit mode -->
        <div v-if="editingId === item.id" class="space-y-3">
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label :class="labelClass">Título *</label>
              <input v-model="editForm.title" type="text" :class="inputClass" required>
            </div>
            <div>
              <label :class="labelClass">Marca / Parceiro</label>
              <input v-model="editForm.partner_name" type="text" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">Tipo de colaboração</label>
              <input v-model="editForm.collaboration_type" type="text" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">Alcance</label>
              <input v-model="editForm.reach" type="text" :class="inputClass" placeholder="8,2k">
            </div>
            <div>
              <label :class="labelClass">Engajamento</label>
              <input v-model="editForm.engagement_rate_text" type="text" :class="inputClass" placeholder="6,1%">
            </div>
            <div>
              <label :class="labelClass">Entregáveis</label>
              <input v-model="editForm.deliverables" type="text" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">URL da imagem</label>
              <input v-model="editForm.image_url" type="url" :class="inputClass">
            </div>
            <div class="sm:col-span-2">
              <label :class="labelClass">Descrição</label>
              <textarea v-model="editForm.description" rows="2" :class="inputClass" />
            </div>
          </div>
          <div class="flex gap-2">
            <AppButton type="button" :loading="saving" @click="saveEdit(item.id)">
              Salvar
            </AppButton>
            <AppButton type="button" variant="secondary" @click="cancelEdit">
              Cancelar
            </AppButton>
          </div>
        </div>

        <!-- Display mode -->
        <div v-else class="flex items-start gap-3">
          <!-- Reorder arrows -->
          <div class="flex shrink-0 flex-col gap-0.5 pt-0.5">
            <button
              class="rounded p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-30"
              :disabled="index === 0"
              title="Mover para cima"
              @click="move(index, -1)"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
            <button
              class="rounded p-0.5 text-gray-300 hover:text-gray-600 disabled:opacity-30"
              :disabled="index === items.length - 1"
              title="Mover para baixo"
              @click="move(index, 1)"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          <img
            v-if="item.image_url"
            :src="item.image_url"
            :alt="item.title"
            class="h-12 w-12 shrink-0 rounded-lg object-cover"
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

          <div class="flex shrink-0 gap-3">
            <button
              class="text-xs text-blue-500 transition-colors hover:text-blue-700"
              @click="startEdit(item)"
            >
              Editar
            </button>
            <button
              class="text-xs text-red-400 transition-colors hover:text-red-600"
              @click="remove(item.id)"
            >
              Remover
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
