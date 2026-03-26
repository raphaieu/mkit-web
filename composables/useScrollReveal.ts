export function useScrollReveal(containerRef: Ref<HTMLElement | null>) {
  onMounted(() => {
    const el = containerRef.value
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    el.querySelectorAll('.reveal').forEach((node) => obs.observe(node))

    onUnmounted(() => obs.disconnect())
  })
}
