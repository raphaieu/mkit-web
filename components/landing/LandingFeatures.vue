<script setup lang="ts">
const features = [
  {
    cls: 'fi-green',
    title: 'Dados sempre atualizados',
    description: 'Métricas importadas direto do Instagram. Sem digitar nada manualmente, sem ficar desatualizado.',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e8788a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>`,
  },
  {
    cls: 'fi-blue',
    title: 'Visual premium personalizável',
    description: 'Escolha entre temas e cores que combinam com sua marca pessoal. Sem cara de template genérico.',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  },
  {
    cls: 'fi-amber',
    title: 'Link compartilhável',
    description: 'Um link único mkit.com.br/@seuhandle. Coloque na bio, envie para marcas, use em propostas.',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
  {
    cls: 'fi-purple',
    title: 'Portfólio de marcas',
    description: 'Mostre suas parcerias anteriores com métricas reais. Prova social que converte em novos jobs.',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
]

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="features-section">
    <div class="features-inner">
      <div class="section-label reveal">Por que o mkit</div>
      <h2 class="section-title reveal reveal-delay-1">
        Tudo que um creator<br>precisa para fechar parcerias.
      </h2>
      <p class="section-subtitle reveal reveal-delay-2">
        Dados reais. Visual profissional. Zero trabalho manual.
      </p>

      <div class="features-grid">
        <div
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feature-card reveal"
          :class="i > 0 ? `reveal-delay-${i}` : ''"
        >
          <div class="feature-icon" :class="feature.cls" v-html="feature.svg" />
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding: 7rem 2rem;
  background: var(--ld-text);
  color: #fff;
  position: relative;
  overflow: hidden;
}

.features-section::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(194,68,90,0.15), transparent 70%);
  top: -200px;
  right: -200px;
  pointer-events: none;
}

.features-inner {
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
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
  color: #fff;
}

.section-subtitle {
  font-size: 1.0625rem;
  color: rgba(255,255,255,0.5);
  text-align: center;
  max-width: 500px;
  margin: 0 auto 4rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.feature-card {
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.3s;
}

.feature-card:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.fi-green  { background: rgba(194,68,90,0.15); }
.fi-blue   { background: rgba(59,130,246,0.15); }
.fi-amber  { background: rgba(245,158,11,0.15); }
.fi-purple { background: rgba(168,85,247,0.15); }

.feature-card h3 {
  font-size: 1.0625rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr; }
}
</style>
