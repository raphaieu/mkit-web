<script setup lang="ts">
const brands = ['Ybera', 'Alther', 'Scala', 'Natura', 'Boticário']

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="logos-section">
    <p class="logos-label reveal">Creators de marcas como</p>
    <div class="logos-row reveal reveal-delay-1">
      <span v-for="brand in brands" :key="brand">{{ brand }}</span>
    </div>
  </section>
</template>

<style scoped>
.logos-section {
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid var(--ld-border);
  border-bottom: 1px solid var(--ld-border);
}

.logos-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ld-text-tertiary);
  margin-bottom: 2rem;
}

.logos-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  opacity: 0.35;
}

.logos-row span {
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
  color: var(--ld-text);
}
</style>
