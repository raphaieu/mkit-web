<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = computed(() => `${config.public.apiBase}/auth/instagram`)

const steps = [
  {
    number: '01',
    cls: 'step-1',
    title: 'Conecte o Instagram',
    description: 'Faça login com sua conta do Instagram em segundos. Sem senha, sem complicação.',
  },
  {
    number: '02',
    cls: 'step-2',
    title: 'Seu kit é gerado',
    description: 'Importamos seus dados reais: seguidores, engajamento, posts recentes e audiência.',
  },
  {
    number: '03',
    cls: 'step-3',
    title: 'Compartilhe o link',
    description: 'Envie mkit.com.br/@seuhandle para marcas e comece a fechar parcerias.',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" id="como-funciona" class="how-section">
    <div class="section-label reveal">Como funciona</div>
    <h2 class="section-title reveal reveal-delay-1">
      Pronto em 30 segundos.<br>Sem complicação.
    </h2>
    <p class="section-subtitle reveal reveal-delay-2">
      Conecte seu Instagram e tenha seu media kit profissional gerado
      automaticamente com dados reais.
    </p>

    <div class="steps-grid">
      <div
        v-for="(step, i) in steps"
        :key="step.number"
        class="step-card reveal"
        :class="[step.cls, i > 0 ? `reveal-delay-${i}` : '']"
      >
        <div class="step-number">{{ step.number }}</div>
        <h3>{{ step.title }}</h3>
        <p>{{ step.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.how-section {
  padding: 7rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

.section-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--ld-accent);
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
}

.section-title {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 400;
  text-align: center;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  color: var(--ld-text);
}

.section-subtitle {
  font-size: 1.0625rem;
  color: var(--ld-text-secondary);
  text-align: center;
  max-width: 500px;
  margin: 0 auto 4rem;
  line-height: 1.6;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
}

/* Connector line between steps */
.steps-grid::before {
  content: '';
  position: absolute;
  top: 24px;
  left: calc(16.66% + 24px);
  right: calc(16.66% + 24px);
  height: 1px;
  background: linear-gradient(90deg, var(--ld-border), var(--ld-accent), var(--ld-border));
  opacity: 0.4;
}

.step-card {
  text-align: center;
  position: relative;
  padding: 0 1rem;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.step-1 .step-number { background: var(--ld-accent-light); color: var(--ld-accent-dark); }
.step-2 .step-number { background: #dbeafe; color: #1e40af; }
.step-3 .step-number { background: #fef3c7; color: #92400e; }

.step-card h3 {
  font-size: 1.0625rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: var(--ld-text);
}

.step-card p {
  font-size: 0.9375rem;
  color: var(--ld-text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .steps-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .steps-grid::before { display: none; }
}
</style>
