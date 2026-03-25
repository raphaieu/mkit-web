import type { CreatorLink } from '~/types/creator'

export interface CreatorLinkPayload {
  emoji?: string | null
  title: string
  description?: string | null
  url: string
  order?: number | null
  active?: boolean
}

export function useCreatorLinks() {
  const api = useApi()

  async function list(): Promise<CreatorLink[]> {
    const response = await api<{ data: CreatorLink[] }>('/me/links')
    return response.data
  }

  async function create(payload: CreatorLinkPayload): Promise<CreatorLink> {
    const response = await api<{ data: CreatorLink }>('/me/links', {
      method: 'POST',
      body: payload,
    })
    return response.data
  }

  async function update(id: number, payload: Partial<CreatorLinkPayload>): Promise<CreatorLink> {
    const response = await api<{ data: CreatorLink }>(`/me/links/${id}`, {
      method: 'PUT',
      body: payload,
    })
    return response.data
  }

  async function reorder(ids: number[]): Promise<void> {
    await api('/me/links/reorder', { method: 'POST', body: { ids } })
  }

  async function remove(id: number): Promise<void> {
    await api(`/me/links/${id}`, { method: 'DELETE' })
  }

  return { list, create, update, reorder, remove }
}
