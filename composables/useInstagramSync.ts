export function useInstagramSync() {
  const api = useApi()

  async function sync(): Promise<void> {
    await api<{ message: string }>('/me/instagram/sync', {
      method: 'POST',
    })
  }

  return { sync }
}
