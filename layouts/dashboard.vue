<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/app/dashboard', icon: 'home' },
  { label: 'Página pública', to: '/app/bio-site', icon: 'layout' },
  { label: 'Portfólio', to: '/app/portfolio', icon: 'briefcase' },
  { label: 'Configurações', to: '/app/settings', icon: 'settings' },
]

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

async function logout() {
  await auth.logout()
  navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Mobile overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-20 bg-black/50 lg:hidden"
      @click="isSidebarOpen = false"
    />

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white border-r border-gray-200 transition-transform duration-200',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="flex h-14 items-center border-b border-gray-100 px-4">
        <NuxtLink to="/" class="text-lg font-bold tracking-tight">mkit</NuxtLink>
      </div>

      <nav class="flex-1 space-y-1 px-2 py-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          :class="
            route.path === item.to
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          "
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="border-t border-gray-100 p-4">
        <button
          class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          @click="logout"
        >
          Sair
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Topbar -->
      <header class="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
        <button
          class="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          @click="toggleSidebar"
        >
          <span class="sr-only">Abrir menu</span>
          <div class="h-5 w-5 flex flex-col justify-center gap-1">
            <span class="block h-0.5 w-full bg-current" />
            <span class="block h-0.5 w-full bg-current" />
            <span class="block h-0.5 w-full bg-current" />
          </div>
        </button>

        <div class="ml-auto flex items-center gap-3">
          <span v-if="auth.user" class="text-sm text-gray-600">
            @{{ auth.user.handle }}
          </span>
        </div>
      </header>

      <main class="p-4 md:p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
