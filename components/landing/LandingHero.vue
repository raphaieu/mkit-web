<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = `${config.public.apiBase}/auth/instagram`
</script>

<template>
  <section class="px-4 py-16 text-center md:py-24">
    <div class="mx-auto max-w-3xl">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
        Seu media kit,<br>
        <span class="text-brand-600">sempre atualizado.</span>
      </h1>
      <p class="mx-auto mt-6 max-w-xl text-lg text-gray-500">
        Crie um bio site profissional com seus dados reais do Instagram.
        Compartilhe com marcas e feche mais parcerias.
      </p>
      <div class="mt-8">
        <a
          :href="loginUrl"
          class="inline-block rounded-full bg-gray-900 px-8 py-3 text-base font-semibold text-white hover:bg-gray-700 transition-colors"
        >
          Criar meu media kit
        </a>
      </div>
    </div>
  </section>
</template>
