<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = computed(() => `${config.public.apiBase}/auth/instagram`)

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" id="planos" class="pricing-section">
    <div class="section-label reveal">Planos</div>
    <h2 class="section-title reveal reveal-delay-1">Simples, transparente.</h2>
    <p class="section-subtitle reveal reveal-delay-2">Comece grátis. Upgrade quando quiser.</p>

    <div class="pricing-grid">
      <!-- Free -->
      <div class="price-card reveal">
        <h3>Free</h3>
        <div class="price-amount">R$ 0</div>
        <div class="price-period">grátis para sempre</div>
        <ul class="price-features">
          <li>Bio site com dados do Instagram</li>
          <li>Até 3 posts no portfólio</li>
          <li>Link compartilhável</li>
          <li class="disabled">Branding mkit no rodapé</li>
        </ul>
        <a :href="loginUrl" class="btn-price-free">Começar grátis</a>
      </div>

      <!-- Pro -->
      <div class="price-card featured reveal reveal-delay-1">
        <div class="price-badge">Mais popular</div>
        <h3>Pro</h3>
        <div class="price-amount">R$ 29</div>
        <div class="price-period">por mês</div>
        <ul class="price-features">
          <li>Tudo do Free</li>
          <li>Até 20 posts no portfólio</li>
          <li>Personalização avançada</li>
          <li>Sem branding mkit</li>
          <li>Analytics de visitantes</li>
        </ul>
        <a :href="loginUrl" class="btn-price-pro">Começar com Pro</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-section {
  padding: 7rem 2rem;
  max-width: 900px;
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

.pricing-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.price-card {
  background: var(--ld-surface);
  border: 1px solid var(--ld-border);
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.3s;
}

.price-card:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
}

.price-card.featured {
  background: var(--ld-text);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.price-card.featured:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 70px rgba(0,0,0,0.2);
}

.price-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.375rem 1rem;
  background: var(--ld-accent);
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 100px;
  white-space: nowrap;
}

.price-card h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.price-amount {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 3rem;
  font-weight: 400;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.price-period {
  font-size: 0.875rem;
  color: var(--ld-text-tertiary);
  margin-bottom: 2rem;
}

.featured .price-period {
  color: rgba(255,255,255,0.4);
}

.price-features {
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
}

.price-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.9375rem;
  padding: 0.5rem 0;
  color: var(--ld-text-secondary);
}

.featured .price-features li {
  color: rgba(255,255,255,0.6);
}

/* Checkmark bullet */
.price-features li::before {
  content: '';
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 50%;
  background: var(--ld-accent-light);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23c2445a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 2px;
}

.featured .price-features li::before {
  background-color: rgba(194,68,90,0.2);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23e8788a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
}

.price-features li.disabled {
  color: var(--ld-text-tertiary);
  text-decoration: line-through;
  opacity: 0.5;
}

.price-features li.disabled::before {
  background-color: #f3f4f6;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23a0a0a0' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
}

.btn-price-free {
  display: block;
  width: 100%;
  padding: 0.875rem;
  text-align: center;
  border: 1px solid var(--ld-border);
  border-radius: 14px;
  background: var(--ld-surface);
  color: var(--ld-text);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-price-free:hover {
  border-color: rgba(0,0,0,0.15);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.btn-price-pro {
  display: block;
  width: 100%;
  padding: 0.875rem;
  text-align: center;
  border: none;
  border-radius: 14px;
  background: var(--ld-accent);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s;
}

.btn-price-pro:hover {
  background: #a83549;
  box-shadow: 0 8px 24px rgba(194,68,90,0.3);
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
