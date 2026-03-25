import type { InstagramInsightsPayload } from '~/types/instagram-insights'

export function useInstagramInsights() {
  const api = useApi()

  async function fetch(): Promise<InstagramInsightsPayload> {
    const response = await api<{ data: InstagramInsightsPayload }>('/me/instagram/insights')
    return response.data
  }

  return { fetch }
}
