<script setup lang="ts">
const config = useRuntimeConfig()
const loginUrl = computed(() => `${config.public.apiBase}/auth/instagram`)

const navScrolled = ref(false)

onMounted(() => {
  const onScroll = () => { navScrolled.value = window.scrollY > 100 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <div class="layout-root">
    <div class="grain" aria-hidden="true" />

    <nav :class="{ scrolled: navScrolled }">
      <NuxtLink to="/" class="nav-logo">m<span>.</span>kit</NuxtLink>
      <div class="nav-links">
        <a href="#como-funciona">Como funciona</a>
        <a href="#planos">Planos</a>
        <a :href="loginUrl" class="btn-nav">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </svg>
          Entrar com Instagram
        </a>
      </div>
    </nav>

    <main>
      <slot />
    </main>

    <footer>
      <p>
        &copy; {{ new Date().getFullYear() }} mkit. Todos os direitos reservados.
        &nbsp;&middot;&nbsp;
        <NuxtLink to="/termos">Termos de Uso</NuxtLink>
        &nbsp;&middot;&nbsp;
        <NuxtLink to="/privacidade">Política de Privacidade</NuxtLink>
      </p>
    </footer>
  </div>
</template>

<style scoped>
.layout-root {
  background: var(--ld-bg);
  color: var(--ld-text);
  min-height: 100vh;
  font-family: 'DM Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* Grain texture overlay */
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ===== NAV ===== */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(250, 250, 247, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--ld-border);
  transition: box-shadow 0.3s;
}

nav.scrolled {
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.04);
}

.nav-logo {
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.03em;
  color: var(--ld-text);
  text-decoration: none;
}

.nav-logo span {
  color: var(--ld-accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  font-size: 0.875rem;
  color: var(--ld-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--ld-text);
}

.btn-nav {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--ld-text) !important;
  color: #fff !important;
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  border-radius: 100px;
  transition: all 0.2s !important;
}

.btn-nav:hover {
  background: #000 !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* ===== FOOTER ===== */
footer {
  padding: 2.5rem 2rem;
  border-top: 1px solid var(--ld-border);
  text-align: center;
}

footer p {
  font-size: 0.8125rem;
  color: var(--ld-text-tertiary);
}

footer a {
  color: var(--ld-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

footer a:hover {
  color: var(--ld-text);
}

@media (max-width: 768px) {
  nav { padding: 0 1.25rem; }
  .nav-links a:not(.btn-nav) { display: none; }
}
</style>
