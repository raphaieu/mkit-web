<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

await navigateTo('/app/dashboard', { replace: true })
</script>

<template>
  <div />
</template>
