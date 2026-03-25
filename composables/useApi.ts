export function useApi() {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('mkit_token')

  return $fetch.create({
    baseURL: `${config.public.apiBase}/api`,
    headers: token.value
      ? { Authorization: `Bearer ${token.value}` }
      : {},
  })
}
