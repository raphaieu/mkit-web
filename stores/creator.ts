import { defineStore } from 'pinia'
import type { Creator } from '~/types/creator'

interface CreatorState {
  current: Creator | null
  loading: boolean
}

export const useCreatorStore = defineStore('creator', {
  state: (): CreatorState => ({
    current: null,
    loading: false,
  }),

  actions: {
    async fetchCreator(handle: string) {
      const config = useRuntimeConfig()
      this.loading = true

      try {
        // GET /api/creators/@{handle} — mesmo contrato que useCreator / @[handle].vue
        const response = await $fetch<{ data: Creator }>(`/api/creators/@${handle}`, {
          baseURL: config.public.apiBase,
        })
        this.current = response.data
      }
      catch {
        this.current = null
      }
      finally {
        this.loading = false
      }
    },
  },
})
