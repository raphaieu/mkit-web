import type { InstagramMedia } from '~/types/instagram'

export function useInstagram() {
  const api = useApi()

  async function refreshData(): Promise<void> {
    await api('/me/instagram/sync', { method: 'POST' })
  }

  async function getRecentPosts(): Promise<InstagramMedia[]> {
    return await api<InstagramMedia[]>('/me/instagram/posts')
  }

  return {
    refreshData,
    getRecentPosts,
  }
}
