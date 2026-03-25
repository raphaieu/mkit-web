import type { PartnerBrand } from '~/types/creator'

export interface PartnerBrandPayload {
  name: string
  category?: string | null
  emoji?: string | null
  order?: number | null
}

export function usePartnerBrands() {
  const api = useApi()

  async function list(): Promise<PartnerBrand[]> {
    const response = await api<{ data: PartnerBrand[] }>('/me/partner-brands')
    return response.data
  }

  async function create(payload: PartnerBrandPayload): Promise<PartnerBrand> {
    const response = await api<{ data: PartnerBrand }>('/me/partner-brands', {
      method: 'POST',
      body: payload,
    })
    return response.data
  }

  async function update(id: number, payload: Partial<PartnerBrandPayload>): Promise<PartnerBrand> {
    const response = await api<{ data: PartnerBrand }>(`/me/partner-brands/${id}`, {
      method: 'PUT',
      body: payload,
    })
    return response.data
  }

  async function reorder(ids: number[]): Promise<void> {
    await api('/me/partner-brands/reorder', { method: 'POST', body: { ids } })
  }

  async function remove(id: number): Promise<void> {
    await api(`/me/partner-brands/${id}`, { method: 'DELETE' })
  }

  return { list, create, update, reorder, remove }
}
