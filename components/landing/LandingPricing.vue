<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = `${config.public.apiBase}/auth/instagram`
</script>

<template>
  <section id="pricing" class="bg-gray-50 px-4 py-16 md:py-24">
    <div class="mx-auto max-w-4xl">
      <h2 class="text-center text-3xl font-bold text-gray-900 md:text-4xl">Planos</h2>
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <!-- Free -->
        <div class="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h3 class="text-lg font-semibold">Free</h3>
          <p class="mt-1 text-3xl font-bold">R$ 0<span class="text-base font-normal text-gray-400">/mês</span></p>
          <ul class="mt-6 space-y-3 text-sm text-gray-600">
            <li>✓ Bio site com dados do Instagram</li>
            <li>✓ Até 3 posts no portfólio</li>
            <li>✓ Compartilhável por link</li>
            <li class="text-gray-400">✗ Branding mkit no rodapé</li>
          </ul>
          <a
            :href="loginUrl"
            class="mt-8 block rounded-full border border-gray-900 px-6 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Começar grátis
          </a>
        </div>

        <!-- Pro -->
        <div class="rounded-2xl border-2 border-gray-900 bg-gray-900 p-6 text-white md:p-8">
          <h3 class="text-lg font-semibold">Pro</h3>
          <p class="mt-1 text-3xl font-bold">R$ 29<span class="text-base font-normal text-gray-400">/mês</span></p>
          <ul class="mt-6 space-y-3 text-sm text-gray-300">
            <li>✓ Tudo do Free</li>
            <li>✓ Até 20 posts no portfólio</li>
            <li>✓ Personalização avançada</li>
            <li>✓ Sem branding mkit</li>
            <li>✓ Analytics de visitantes</li>
          </ul>
          <a
            :href="loginUrl"
            class="mt-8 block rounded-full bg-white px-6 py-2.5 text-center text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
          >
            Começar com Pro
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
