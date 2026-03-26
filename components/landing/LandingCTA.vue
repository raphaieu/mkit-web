<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = computed(() => `${config.public.apiBase}/auth/instagram`)

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="final-cta">
    <div class="final-cta-inner">
      <h2 class="reveal">
        Pare de mandar PDF.<br>Comece a <em>fechar parcerias.</em>
      </h2>
      <p class="reveal reveal-delay-1">
        Crie seu media kit profissional em 30 segundos. Grátis.
      </p>
      <a :href="loginUrl" class="btn-accent reveal reveal-delay-2">
        Criar meu media kit
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/>
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
.final-cta {
  padding: 7rem 2rem;
  text-align: center;
  position: relative;
}

.final-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 500px 300px at 50% 50%, rgba(194,68,90,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.final-cta-inner {
  position: relative;
  z-index: 1;
}

.final-cta-inner h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2rem, 3.5vw, 2.75rem);
  font-weight: 400;
  margin-bottom: 1rem;
  line-height: 1.15;
  color: var(--ld-text);
}

.final-cta-inner h2 em {
  font-style: italic;
  color: var(--ld-accent);
}

.final-cta-inner p {
  color: var(--ld-text-secondary);
  font-size: 1.0625rem;
  margin-bottom: 2.5rem;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.btn-accent {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: var(--ld-accent);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s;
}

.btn-accent:hover {
  background: #a83549;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(194,68,90,0.3);
}
</style>
