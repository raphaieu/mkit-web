<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
        @click.self="emit('close')"
      >
        <div class="absolute inset-0 bg-black/50" @click="emit('close')" />
        <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
          <div v-if="title" class="mb-4 flex items-center justify-between">
            <h3 class="font-semibold text-gray-900">{{ title }}</h3>
            <button
              class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
