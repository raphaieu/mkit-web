import { defineStore } from 'pinia'

export interface InstagramProfile {
  username: string
  full_name: string | null
  biography: string | null
  profile_picture_url: string | null
  followers_count: number
  following_count: number
  media_count: number
  last_synced_at: string | null
}

export interface AuthUser {
  id: number
  handle: string
  name: string
  email: string | null
  plan: 'free' | 'pro'
  instagram: InstagramProfile | null
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state): boolean => state.user !== null,
  },

  actions: {
    async fetchUser() {
      const config = useRuntimeConfig()
      const token = useCookie<string | null>('mkit_token')

      if (!token.value) {
        this.user = null
        return
      }

      this.loading = true

      try {
        const response = await $fetch<{ data: AuthUser }>('/api/me', {
          baseURL: config.public.apiBase,
          headers: { Authorization: `Bearer ${token.value}` },
        })
        this.user = response.data
      }
      catch {
        this.user = null
      }
      finally {
        this.loading = false
      }
    },

    async logout() {
      const config = useRuntimeConfig()
      const token = useCookie<string | null>('mkit_token')

      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
          baseURL: config.public.apiBase,
          headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
        })
      }
      finally {
        token.value = null
        this.user = null
      }
    },
  },
})
