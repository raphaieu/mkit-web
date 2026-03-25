<script setup lang="ts">
import type { CreatorProfilePublic } from '~/types/creator'
import type { CreatorProfileUpdatePayload } from '~/types/creator-profile'

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({ title: 'Página pública | mkit' })

const auth = useAuthStore()
const { fetch: fetchProfile, update: updateProfile } = useCreatorProfile()
const partnerApi = usePartnerBrands()
const linksApi = useCreatorLinks()

const loading = ref(true)
const savingProfile = ref(false)
const profileError = ref<string | null>(null)

const profile = ref<CreatorProfilePublic | null>(null)

const form = reactive({
  display_name: '',
  bio: '',
  contact_email: '',
  contact_whatsapp: '',
  city: '',
  theme: 'gold' as CreatorProfilePublic['theme'],
  niches: [] as string[],
  badges: [] as string[],
  instagram_url: '',
  tiktok_url: '',
  youtube_url: '',
  pinterest_url: '',
  twitter_url: '',
})

const nicheInput = ref('')
const badgeInput = ref('')

const partnerBrands = ref<Awaited<ReturnType<typeof partnerApi.list>>>([])
const links = ref<Awaited<ReturnType<typeof linksApi.list>>>([])

const newBrand = reactive({ name: '', category: '', emoji: '✨' })
const newLink = reactive({ title: '', description: '', url: '', emoji: '' as string })

const editingBrandId = ref<number | null>(null)
const editBrand = reactive({ name: '', category: '', emoji: '' })

const editingLinkId = ref<number | null>(null)
const editLink = reactive({ title: '', description: '', url: '', emoji: '' })

const portfolioListRef = ref<{ load: () => Promise<void> } | null>(null)

const inputClass =
  'mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none'
const labelClass = 'block text-xs font-medium text-gray-500'

function applyProfile(p: CreatorProfilePublic) {
  profile.value = p
  form.display_name = p.display_name ?? ''
  form.bio = p.bio ?? ''
  form.contact_email = p.contact_email ?? ''
  form.contact_whatsapp = p.contact_whatsapp ?? ''
  form.city = p.city ?? ''
  form.theme = p.theme ?? 'gold'
  form.niches = [...(p.niches ?? [])]
  form.badges = [...(p.badges ?? [])]
  form.instagram_url = p.social?.instagram ?? ''
  form.tiktok_url = p.social?.tiktok ?? ''
  form.youtube_url = p.social?.youtube ?? ''
  form.pinterest_url = p.social?.pinterest ?? ''
  form.twitter_url = p.social?.twitter ?? ''
}

async function loadAll() {
  loading.value = true
  profileError.value = null
  try {
    const [p, b, l] = await Promise.all([
      fetchProfile(),
      partnerApi.list(),
      linksApi.list(),
    ])
    applyProfile(p)
    partnerBrands.value = b
    links.value = l
    await nextTick()
    portfolioListRef.value?.load()
  }
  catch (e) {
    profileError.value = 'Não foi possível carregar os dados. Verifique se está logado.'
    console.error(e)
  }
  finally {
    loading.value = false
  }
}

onMounted(loadAll)

async function saveProfile() {
  savingProfile.value = true
  profileError.value = null
  try {
    const payload: CreatorProfileUpdatePayload = {
      display_name: form.display_name || null,
      bio: form.bio || null,
      contact_email: form.contact_email || null,
      contact_whatsapp: form.contact_whatsapp || null,
      city: form.city || null,
      theme: form.theme,
      niches: form.niches,
      badges: form.badges,
      instagram_url: form.instagram_url || null,
      tiktok_url: form.tiktok_url || null,
      youtube_url: form.youtube_url || null,
      pinterest_url: form.pinterest_url || null,
      twitter_url: form.twitter_url || null,
    }
    const updated = await updateProfile(payload)
    applyProfile(updated)
  }
  catch {
    profileError.value = 'Erro ao salvar o perfil.'
  }
  finally {
    savingProfile.value = false
  }
}

function addNiche() {
  const t = nicheInput.value.trim()
  if (!t || form.niches.includes(t)) return
  form.niches = [...form.niches, t]
  nicheInput.value = ''
}

function removeNiche(tag: string) {
  form.niches = form.niches.filter(n => n !== tag)
}

function addBadge() {
  const t = badgeInput.value.trim()
  if (!t || form.badges.includes(t)) return
  form.badges = [...form.badges, t]
  badgeInput.value = ''
}

function removeBadge(tag: string) {
  form.badges = form.badges.filter(b => b !== tag)
}

async function createPartnerBrand() {
  if (!newBrand.name.trim()) return
  const created = await partnerApi.create({
    name: newBrand.name.trim(),
    category: newBrand.category || null,
    emoji: newBrand.emoji || null,
  })
  partnerBrands.value = [...partnerBrands.value, created]
  newBrand.name = ''
  newBrand.category = ''
  newBrand.emoji = '✨'
}

function startEditBrand(b: typeof partnerBrands.value[number]) {
  editingBrandId.value = b.id
  editBrand.name = b.name
  editBrand.category = b.category ?? ''
  editBrand.emoji = b.emoji ?? ''
}

async function saveEditBrand(id: number) {
  const updated = await partnerApi.update(id, {
    name: editBrand.name.trim(),
    category: editBrand.category || null,
    emoji: editBrand.emoji || null,
  })
  const idx = partnerBrands.value.findIndex(b => b.id === id)
  if (idx !== -1) partnerBrands.value[idx] = updated
  editingBrandId.value = null
}

async function moveBrand(index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= partnerBrands.value.length) return
  const copy = [...partnerBrands.value]
  ;[copy[index], copy[target]] = [copy[target]!, copy[index]!]
  partnerBrands.value = copy
  await partnerApi.reorder(copy.map(b => b.id))
}

async function deletePartnerBrand(id: number) {
  await partnerApi.remove(id)
  partnerBrands.value = partnerBrands.value.filter(b => b.id !== id)
}

async function createLink() {
  if (!newLink.title.trim() || !newLink.url.trim()) return
  const created = await linksApi.create({
    title: newLink.title.trim(),
    description: newLink.description || null,
    url: newLink.url.trim(),
    emoji: newLink.emoji || null,
  })
  links.value = [...links.value, created]
  newLink.title = ''
  newLink.description = ''
  newLink.url = ''
  newLink.emoji = ''
}

function startEditLink(l: typeof links.value[number]) {
  editingLinkId.value = l.id
  editLink.title = l.title
  editLink.description = l.description ?? ''
  editLink.url = l.url
  editLink.emoji = l.emoji ?? ''
}

async function saveEditLink(id: number) {
  const updated = await linksApi.update(id, {
    title: editLink.title.trim(),
    description: editLink.description || null,
    url: editLink.url.trim(),
    emoji: editLink.emoji || null,
  })
  const idx = links.value.findIndex(l => l.id === id)
  if (idx !== -1) links.value[idx] = updated
  editingLinkId.value = null
}

async function moveLink(index: number, direction: -1 | 1) {
  const target = index + direction
  if (target < 0 || target >= links.value.length) return
  const copy = [...links.value]
  ;[copy[index], copy[target]] = [copy[target]!, copy[index]!]
  links.value = copy
  await linksApi.reorder(copy.map(l => l.id))
}

async function deleteLink(id: number) {
  await linksApi.remove(id)
  links.value = links.value.filter(l => l.id !== id)
}

function onPortfolioCreated() {
  portfolioListRef.value?.load()
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Página pública</h1>
      <p class="mt-1 text-sm text-gray-500">
        Conteúdo exibido em
        <span class="font-mono text-gray-700">mkit.com.br/@{{ auth.user?.handle ?? 'handle' }}</span>.
        Dados do Instagram vêm da sincronização; o restante é salvo na API.
      </p>
      <p v-if="profileError" class="mt-3 text-sm text-red-600">{{ profileError }}</p>
    </div>

    <div v-if="loading" class="text-sm text-gray-500">
      Carregando…
    </div>

    <template v-else>
      <!-- Instagram -->
      <DashboardSectionCard
        title="Dados do Instagram"
        description="Sincronizados após OAuth e pelo botão abaixo."
        source="api"
      >
        <DashboardInstagramDataPreview :user="auth.user" />
      </DashboardSectionCard>

      <!-- Perfil público (creator_profile) -->
      <DashboardSectionCard
        title="Perfil público"
        description="Contato, cidade, tema, nichos, badges e links de redes."
        source="manual"
      >
        <form class="space-y-4" @submit.prevent="saveProfile">
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label :class="labelClass">Nome no bio site</label>
              <input
                v-model="form.display_name"
                type="text"
                :class="inputClass"
                maxlength="255"
                :placeholder="auth.user?.instagram?.full_name ?? 'Deixe vazio para usar o nome do Instagram'"
              >
              <p class="mt-1 text-xs text-gray-400">Vazio = usa o nome da conta Instagram</p>
            </div>
            <div>
              <label :class="labelClass">Bio no bio site</label>
              <textarea
                v-model="form.bio"
                rows="3"
                :class="inputClass"
                maxlength="1000"
                :placeholder="auth.user?.instagram?.biography ?? 'Deixe vazio para usar a bio do Instagram'"
              />
              <p class="mt-1 text-xs text-gray-400">Vazio = usa a bio da conta Instagram</p>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label :class="labelClass">E-mail para propostas</label>
              <input v-model="form.contact_email" type="email" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">WhatsApp (número ou URL curta)</label>
              <input v-model="form.contact_whatsapp" type="text" :class="inputClass" maxlength="30">
            </div>
            <div>
              <label :class="labelClass">Cidade</label>
              <input v-model="form.city" type="text" :class="inputClass" placeholder="Salvador, BA">
            </div>
            <div>
              <label :class="labelClass">Tema do bio site</label>
              <select v-model="form.theme" :class="inputClass">
                <option value="gold">Ouro</option>
                <option value="rose">Rosa</option>
                <option value="ocean">Ocean</option>
                <option value="sage">Sage</option>
              </select>
            </div>
          </div>

          <div>
            <label :class="labelClass">Nichos</label>
            <div class="mt-1 flex flex-wrap gap-2">
              <input
                v-model="nicheInput"
                type="text"
                :class="[inputClass, 'max-w-xs']"
                placeholder="Adicionar nicho"
                @keydown.enter.prevent="addNiche"
              >
              <AppButton type="button" variant="secondary" @click="addNiche">
                Adicionar
              </AppButton>
            </div>
            <div v-if="form.niches.length" class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="tag in form.niches"
                :key="tag"
                type="button"
                class="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
                @click="removeNiche(tag)"
              >
                {{ tag }} ×
              </button>
            </div>
          </div>

          <div>
            <label :class="labelClass">Badges (ex.: UGC Creator)</label>
            <div class="mt-1 flex flex-wrap gap-2">
              <input
                v-model="badgeInput"
                type="text"
                :class="[inputClass, 'max-w-xs']"
                placeholder="Adicionar badge"
                @keydown.enter.prevent="addBadge"
              >
              <AppButton type="button" variant="secondary" @click="addBadge">
                Adicionar
              </AppButton>
            </div>
            <div v-if="form.badges.length" class="mt-2 flex flex-wrap gap-2">
              <button
                v-for="tag in form.badges"
                :key="tag"
                type="button"
                class="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
                @click="removeBadge(tag)"
              >
                {{ tag }} ×
              </button>
            </div>
          </div>

          <p class="text-xs font-medium text-gray-500">Redes (URLs manuais; o Instagram da conta também vem da API)</p>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label :class="labelClass">Instagram (URL)</label>
              <input v-model="form.instagram_url" type="url" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">TikTok</label>
              <input v-model="form.tiktok_url" type="url" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">YouTube</label>
              <input v-model="form.youtube_url" type="url" :class="inputClass">
            </div>
            <div>
              <label :class="labelClass">Pinterest</label>
              <input v-model="form.pinterest_url" type="url" :class="inputClass">
            </div>
            <div class="md:col-span-2">
              <label :class="labelClass">X / Twitter</label>
              <input v-model="form.twitter_url" type="url" :class="inputClass">
            </div>
          </div>

          <AppButton type="submit" :loading="savingProfile">
            Salvar perfil público
          </AppButton>
        </form>
      </DashboardSectionCard>

      <!-- Marcas parceiras -->
      <DashboardSectionCard
        title="Marcas parceiras"
        description="Carrossel no bio site."
        source="manual"
      >
        <ul v-if="partnerBrands.length" class="mb-4 divide-y divide-gray-100 rounded-lg border border-gray-100">
          <li
            v-for="(b, index) in partnerBrands"
            :key="b.id"
            class="px-3 py-2 text-sm"
          >
            <!-- Edit mode -->
            <div v-if="editingBrandId === b.id" class="flex flex-wrap items-end gap-2">
              <input v-model="editBrand.emoji" type="text" :class="[inputClass, 'w-16']" placeholder="Emoji" maxlength="4">
              <input v-model="editBrand.name" type="text" :class="[inputClass, 'flex-1']" placeholder="Nome *">
              <input v-model="editBrand.category" type="text" :class="[inputClass, 'flex-1']" placeholder="Categoria">
              <div class="flex gap-2 self-end">
                <AppButton type="button" @click="saveEditBrand(b.id)">Salvar</AppButton>
                <AppButton type="button" variant="secondary" @click="editingBrandId = null">Cancelar</AppButton>
              </div>
            </div>

            <!-- Display mode -->
            <div v-else class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5">
                <!-- Reorder arrows -->
                <div class="flex flex-col gap-0.5">
                  <button
                    type="button"
                    class="text-gray-300 hover:text-gray-600 disabled:opacity-30"
                    :disabled="index === 0"
                    @click="moveBrand(index, -1)"
                  >
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="text-gray-300 hover:text-gray-600 disabled:opacity-30"
                    :disabled="index === partnerBrands.length - 1"
                    @click="moveBrand(index, 1)"
                  >
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <span><span class="mr-1">{{ b.emoji ?? '✨' }}</span>{{ b.name }}<span v-if="b.category" class="text-gray-400"> · {{ b.category }}</span></span>
              </div>
              <div class="flex gap-3">
                <button type="button" class="text-blue-500 hover:underline" @click="startEditBrand(b)">Editar</button>
                <button type="button" class="text-red-500 hover:underline" @click="deletePartnerBrand(b.id)">Remover</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="grid gap-3 sm:grid-cols-4">
          <input v-model="newBrand.emoji" type="text" :class="inputClass" placeholder="Emoji" maxlength="4">
          <input v-model="newBrand.name" type="text" :class="inputClass" placeholder="Nome *">
          <input v-model="newBrand.category" type="text" :class="inputClass" placeholder="Categoria">
          <AppButton type="button" variant="secondary" class="self-end" @click="createPartnerBrand">
            Adicionar
          </AppButton>
        </div>
      </DashboardSectionCard>

      <!-- Experiências = portfolio_posts -->
      <DashboardSectionCard
        title="Experiências com marcas"
        description="Mesmos registros do Portfólio — campanhas, UGC e métricas em texto."
        source="manual"
      >
        <p class="mb-4 text-sm text-gray-500">
          Edição completa também em
          <NuxtLink to="/app/portfolio" class="font-medium text-brand-600 hover:text-brand-700">Portfólio</NuxtLink>.
        </p>
        <DashboardPortfolioForm @created="onPortfolioCreated" />
        <DashboardPortfolioList ref="portfolioListRef" class="mt-6" />
      </DashboardSectionCard>

      <!-- Links -->
      <DashboardSectionCard
        title="Links extras"
        description="Botões no bio site (cupons, portfólio externo, etc.)."
        source="manual"
      >
        <ul v-if="links.length" class="mb-4 divide-y divide-gray-100 rounded-lg border border-gray-100">
          <li
            v-for="(link, index) in links"
            :key="link.id"
            class="px-3 py-2 text-sm"
          >
            <!-- Edit mode -->
            <div v-if="editingLinkId === link.id" class="space-y-2">
              <div class="grid gap-2 sm:grid-cols-2">
                <input v-model="editLink.emoji" type="text" :class="inputClass" placeholder="Emoji">
                <input v-model="editLink.title" type="text" :class="inputClass" placeholder="Título *">
                <input v-model="editLink.description" type="text" :class="inputClass" placeholder="Subtítulo">
                <input v-model="editLink.url" type="url" :class="inputClass" placeholder="URL *">
              </div>
              <div class="flex gap-2">
                <AppButton type="button" @click="saveEditLink(link.id)">Salvar</AppButton>
                <AppButton type="button" variant="secondary" @click="editingLinkId = null">Cancelar</AppButton>
              </div>
            </div>

            <!-- Display mode -->
            <div v-else class="flex items-center justify-between gap-2">
              <div class="flex min-w-0 items-center gap-1.5">
                <!-- Reorder arrows -->
                <div class="flex shrink-0 flex-col gap-0.5">
                  <button
                    type="button"
                    class="text-gray-300 hover:text-gray-600 disabled:opacity-30"
                    :disabled="index === 0"
                    @click="moveLink(index, -1)"
                  >
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    class="text-gray-300 hover:text-gray-600 disabled:opacity-30"
                    :disabled="index === links.length - 1"
                    @click="moveLink(index, 1)"
                  >
                    <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                </div>
                <span class="truncate">
                  <span v-if="link.emoji" class="mr-1">{{ link.emoji }}</span>{{ link.title }}<span class="text-gray-400"> — {{ link.url }}</span>
                </span>
              </div>
              <div class="flex shrink-0 gap-3">
                <button type="button" class="text-blue-500 hover:underline" @click="startEditLink(link)">Editar</button>
                <button type="button" class="text-red-500 hover:underline" @click="deleteLink(link.id)">Remover</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="grid gap-3 md:grid-cols-2">
          <input v-model="newLink.emoji" type="text" :class="inputClass" placeholder="Emoji">
          <input v-model="newLink.title" type="text" :class="inputClass" placeholder="Título *">
          <input v-model="newLink.description" type="text" :class="inputClass" placeholder="Subtítulo">
          <input v-model="newLink.url" type="url" :class="inputClass" placeholder="URL *">
        </div>
        <AppButton type="button" variant="secondary" class="mt-3" @click="createLink">
          Adicionar link
        </AppButton>
      </DashboardSectionCard>

      <DashboardInstagramInsightsPanel v-if="auth.user?.instagram" />
    </template>
  </div>
</template>
