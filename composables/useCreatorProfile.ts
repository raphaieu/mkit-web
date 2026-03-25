import type { CreatorProfilePublic } from '~/types/creator'
import type { CreatorProfileUpdatePayload } from '~/types/creator-profile'

export function useCreatorProfile() {
  const api = useApi()

  async function fetch(): Promise<CreatorProfilePublic> {
    const response = await api<{ data: CreatorProfilePublic }>('/me/creator-profile')
    return response.data
  }

  async function update(payload: CreatorProfileUpdatePayload): Promise<CreatorProfilePublic> {
    const response = await api<{ data: CreatorProfilePublic }>('/me/creator-profile', {
      method: 'PUT',
      body: payload,
    })
    return response.data
  }

  return { fetch, update }
}
