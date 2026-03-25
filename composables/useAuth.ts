import { useAuthStore } from '~/stores/auth'

export function useAuth() {
  const store = useAuthStore()
  const config = useRuntimeConfig()

  const loginUrl = `${config.public.apiBase}/auth/instagram`

  async function fetchUser() {
    await store.fetchUser()
  }

  async function logout() {
    await store.logout()
  }

  return {
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    loginUrl,
    fetchUser,
    logout,
  }
}
