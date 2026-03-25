<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Conecte o Instagram',
    description: 'Faça login com sua conta do Instagram em segundos.',
  },
  {
    number: '02',
    title: 'Seu kit é gerado',
    description: 'Importamos seus dados reais: seguidores, engajamento, posts recentes.',
  },
  {
    number: '03',
    title: 'Compartilhe o link',
    description: 'Envie mkit.com.br/@seuhandle para marcas e comece a fechar parcerias.',
  },
]
</script>

<template>
  <section class="bg-gray-50 px-4 py-16 md:py-24">
    <div class="mx-auto max-w-5xl">
      <h2 class="text-center text-3xl font-bold text-gray-900 md:text-4xl">
        Como funciona
      </h2>
      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div v-for="step in steps" :key="step.number" class="text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-lg font-bold text-white">
            {{ step.number }}
          </div>
          <h3 class="mt-4 text-lg font-semibold text-gray-900">{{ step.title }}</h3>
          <p class="mt-2 text-sm text-gray-500">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
