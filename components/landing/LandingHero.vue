<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = computed(() => `${config.public.apiBase}/auth/instagram`)

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="hero">
    <div class="hero-bg" aria-hidden="true" />

    <div class="hero-content">
      <!-- Text side -->
      <div class="hero-text">
        <div class="hero-badge reveal">
          Novo: dados atualizados em tempo real
        </div>

        <h1 class="reveal reveal-delay-1">
          Seu media kit,<br><em>sempre atualizado.</em>
        </h1>

        <p class="hero-description reveal reveal-delay-2">
          Crie um bio site profissional com dados reais do seu Instagram.
          Compartilhe com marcas e feche mais parcerias — sem PDF, sem planilha.
        </p>

        <div class="hero-cta-row reveal reveal-delay-3">
          <a :href="loginUrl" class="btn-accent">
            Criar meu media kit
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a href="#como-funciona" class="btn-secondary">Ver como funciona</a>
        </div>

        <div class="social-proof reveal reveal-delay-4">
          <div class="avatar-stack">
            <div class="av" style="background:#6366f1">L</div>
            <div class="av" style="background:#ec4899">M</div>
            <div class="av" style="background:#f59e0b">A</div>
            <div class="av" style="background:#14b8a6">R</div>
            <div class="av" style="background:#8b5cf6">J</div>
          </div>
          <div class="social-proof-text">
            <strong>200+ creators</strong> já usam o mkit<br>para fechar parcerias
          </div>
        </div>
      </div>

      <!-- Phone mockup -->
      <div class="hero-visual reveal reveal-delay-2">
        <div class="phone-frame">
          <div class="phone-screen">
            <div class="phone-notch" />
            <div class="phone-content">
              <div class="phone-avatar">R</div>
              <div class="phone-name">raphaieu</div>
              <div class="phone-handle">@raphaieu · Salvador, BA</div>
              <div class="phone-stats">
                <div class="phone-stat">
                  <div class="phone-stat-val">1.8K</div>
                  <div class="phone-stat-label">Seguidores</div>
                </div>
                <div class="phone-stat">
                  <div class="phone-stat-val">952</div>
                  <div class="phone-stat-label">Posts</div>
                </div>
                <div class="phone-stat">
                  <div class="phone-stat-val">5.2%</div>
                  <div class="phone-stat-label">Engaj.</div>
                </div>
              </div>
              <div class="phone-cta-mock">Enviar proposta</div>
              <div class="phone-section-label">Posts recentes</div>
              <div class="phone-posts">
                <div class="phone-post post-1" />
                <div class="phone-post post-2" />
                <div class="phone-post post-3" />
                <div class="phone-post post-4" />
              </div>
            </div>
          </div>
        </div>

        <!-- Floating metric cards -->
        <div class="float-card float-card-1">
          <div class="fc-label">Engajamento</div>
          <div class="fc-value">5.2% <span>+12%</span></div>
        </div>
        <div class="float-card float-card-2">
          <div class="fc-label">Alcance 28d</div>
          <div class="fc-value">3.4K <span>+8%</span></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem 2rem 6rem;
}

/* Animated mesh background */
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.hero-bg::before {
  content: '';
  position: absolute;
  width: 140%;
  height: 140%;
  top: -20%;
  left: -20%;
  background:
    radial-gradient(ellipse 600px 600px at 20% 30%, rgba(194,68,90,0.08) 0%, transparent 70%),
    radial-gradient(ellipse 500px 500px at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 70%),
    radial-gradient(ellipse 400px 400px at 50% 80%, rgba(168,85,247,0.04) 0%, transparent 70%);
  animation: meshMove 20s ease-in-out infinite alternate;
}

@keyframes meshMove {
  0%   { transform: translate(0, 0) rotate(0deg); }
  33%  { transform: translate(30px, -20px) rotate(1deg); }
  66%  { transform: translate(-20px, 15px) rotate(-0.5deg); }
  100% { transform: translate(10px, -10px) rotate(0.5deg); }
}

/* Layout */
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text { max-width: 560px; }

/* Badge */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  background: var(--ld-accent-light);
  color: var(--ld-accent-dark);
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 100px;
  margin-bottom: 2rem;
}

.hero-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ld-accent);
  animation: pulse 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.5); }
}

/* Headline */
h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(2.75rem, 5vw, 4rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ld-text);
  margin-bottom: 1.5rem;
}

h1 em {
  font-style: italic;
  color: var(--ld-accent);
}

/* Description */
.hero-description {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--ld-text-secondary);
  margin-bottom: 2.5rem;
  max-width: 440px;
}

/* CTAs */
.hero-cta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
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

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: var(--ld-surface);
  color: var(--ld-text);
  font-size: 0.9375rem;
  font-weight: 500;
  border-radius: 100px;
  border: 1px solid rgba(0,0,0,0.1);
  text-decoration: none;
  transition: all 0.2s;
}

.btn-secondary:hover {
  border-color: rgba(0,0,0,0.2);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}

/* Social proof */
.social-proof {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar-stack {
  display: flex;
}

.av {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--ld-bg);
  margin-left: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #fff;
}
.av:first-child { margin-left: 0; }

.social-proof-text {
  font-size: 0.8125rem;
  color: var(--ld-text-secondary);
  line-height: 1.4;
}

.social-proof-text strong {
  color: var(--ld-text);
  font-weight: 600;
}

/* ===== Phone Mockup ===== */
.hero-visual {
  display: flex;
  justify-content: center;
  position: relative;
}

.phone-frame {
  width: 280px;
  height: 580px;
  background: #1a1a1a;
  border-radius: 40px;
  padding: 12px;
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.1) inset,
    0 25px 80px rgba(0,0,0,0.15),
    0 8px 30px rgba(0,0,0,0.1);
  position: relative;
  animation: phoneFloat 6s ease-in-out infinite;
}

@keyframes phoneFloat {
  0%, 100% { transform: translateY(0px) rotate(2deg); }
  50%       { transform: translateY(-12px) rotate(2deg); }
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: var(--ld-bg);
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 28px;
  background: #1a1a1a;
  border-radius: 0 0 18px 18px;
  z-index: 2;
}

.phone-content {
  padding: 40px 20px 20px;
  height: 100%;
  overflow: hidden;
}

.phone-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--ld-accent), #3b82f6);
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 1.125rem;
}

.phone-name {
  text-align: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--ld-text);
  margin-bottom: 2px;
}

.phone-handle {
  text-align: center;
  font-size: 0.6875rem;
  color: var(--ld-text-tertiary);
  margin-bottom: 12px;
}

.phone-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--ld-border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 14px;
}

.phone-stat {
  background: var(--ld-surface);
  text-align: center;
  padding: 10px 4px;
}

.phone-stat-val {
  font-weight: 600;
  font-size: 0.8125rem;
  color: var(--ld-text);
}

.phone-stat-label {
  font-size: 0.5625rem;
  color: var(--ld-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 2px;
}

.phone-cta-mock {
  width: 100%;
  padding: 10px;
  background: var(--ld-accent-dark);
  border-radius: 12px;
  text-align: center;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 14px;
}

.phone-section-label {
  font-size: 0.5625rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ld-text-tertiary);
  margin-bottom: 8px;
}

.phone-posts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
}

.phone-post {
  aspect-ratio: 1;
  border-radius: 8px;
}
.post-1 { background: linear-gradient(135deg, #fecaca, #fde68a); }
.post-2 { background: linear-gradient(135deg, #bbf7d0, #bfdbfe); }
.post-3 { background: linear-gradient(135deg, #e9d5ff, #fbcfe8); }
.post-4 { background: linear-gradient(135deg, #bfdbfe, #bbf7d0); }

/* Floating cards */
.float-card {
  position: absolute;
  background: var(--ld-surface);
  border-radius: 16px;
  padding: 14px 18px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.08), 0 0 0 1px var(--ld-border);
  font-size: 0.8125rem;
  z-index: 3;
  animation: floatCard 5s ease-in-out infinite;
}

.float-card-1 { top: 60px; right: -30px; animation-delay: 0s; }
.float-card-2 { bottom: 100px; left: -20px; animation-delay: 1.5s; }

@keyframes floatCard {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-8px); }
}

.fc-label {
  font-size: 0.6875rem;
  color: var(--ld-text-tertiary);
  margin-bottom: 4px;
}

.fc-value {
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--ld-text);
}

.fc-value span {
  color: var(--ld-accent);
  font-size: 0.75rem;
  font-weight: 500;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
  .hero-text { max-width: 100%; }
  .hero-description { margin-left: auto; margin-right: auto; }
  .hero-cta-row { justify-content: center; flex-wrap: wrap; }
  .social-proof { justify-content: center; }
  .phone-frame { width: 240px; height: 500px; }
  .float-card { display: none; }
}
</style>
