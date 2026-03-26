<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = computed(() => `${config.public.apiBase}/auth/instagram`)

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="preview-section">
    <div class="section-label reveal">Preview</div>
    <h2 class="section-title reveal reveal-delay-1">Veja como fica</h2>
    <p class="section-subtitle reveal reveal-delay-2">
      Um bio site profissional com seus dados reais do Instagram.
    </p>

    <div class="preview-container reveal reveal-delay-3">
      <!-- Browser chrome -->
      <div class="preview-bar">
        <div class="preview-dot" />
        <div class="preview-dot" />
        <div class="preview-dot" />
        <div class="preview-url">mkit.com.br/@seuhandle</div>
      </div>

      <!-- Preview body -->
      <div class="preview-body">
        <div class="preview-placeholder">
          <div class="pp-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c2445a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </div>
          <h3>Conecte seu Instagram</h3>
          <p>Veja seu media kit ao vivo aqui</p>
          <a :href="loginUrl" class="btn-cta">
            Começar agora
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.preview-section {
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

.preview-container {
  background: var(--ld-surface);
  border: 1px solid var(--ld-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.05);
}

.preview-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--ld-border);
}

.preview-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e5e7eb;
}

.preview-url {
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  color: var(--ld-text-tertiary);
  background: var(--ld-bg);
  padding: 6px 16px;
  border-radius: 8px;
  margin: 0 2rem;
}

.preview-body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 3rem;
  background:
    radial-gradient(ellipse at 30% 50%, rgba(194,68,90,0.04) 0%, transparent 60%),
    radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.03) 0%, transparent 60%),
    var(--ld-bg);
}

.preview-placeholder {
  text-align: center;
}

.pp-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: var(--ld-accent-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.preview-placeholder h3 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  color: var(--ld-text);
}

.preview-placeholder p {
  color: var(--ld-text-secondary);
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  background: var(--ld-accent);
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.25s;
}

.btn-cta:hover {
  background: #a83549;
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(194,68,90,0.3);
}
</style>
