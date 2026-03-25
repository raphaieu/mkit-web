<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = 'https://www.instagram.com/oauth/authorize?force_reauth=true&client_id=1509819880491543&redirect_uri=https://dev.mkit.com.br/auth/instagram/callback&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900">
    <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          mkit
        </NuxtLink>
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/#pricing"
            class="hidden text-sm text-gray-600 hover:text-gray-900 md:block"
          >
            Preços
          </NuxtLink>
          <a
            :href="loginUrl"
            class="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors"
          >
            Entrar com Instagram
          </a>
        </div>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
      <p>© {{ new Date().getFullYear() }} mkit. Todos os direitos reservados.</p>
    </footer>
  </div>
</template>
