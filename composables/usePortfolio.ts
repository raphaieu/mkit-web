import type { PortfolioItem } from '~/types/creator'
import type { PortfolioItemPayload } from '~/types/portfolio'

export function usePortfolio() {
  const api = useApi()

  async function list(): Promise<PortfolioItem[]> {
    const response = await api<{ data: PortfolioItem[] }>('/me/portfolio')
    return response.data
  }

  async function create(payload: PortfolioItemPayload): Promise<PortfolioItem> {
    const response = await api<{ data: PortfolioItem }>('/me/portfolio', {
      method: 'POST',
      body: payload,
    })
    return response.data
  }

  async function update(id: number, payload: PortfolioItemPayload): Promise<PortfolioItem> {
    const response = await api<{ data: PortfolioItem }>(`/me/portfolio/${id}`, {
      method: 'PUT',
      body: payload,
    })
    return response.data
  }

  async function remove(id: number): Promise<void> {
    await api(`/me/portfolio/${id}`, { method: 'DELETE' })
  }

  return {
    list,
    create,
    update,
    remove,
  }
}
