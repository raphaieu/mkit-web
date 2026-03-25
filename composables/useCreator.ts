import type { Creator } from '~/types/creator'

export function useCreator(handle: string) {
  const config = useRuntimeConfig()

  const { data: raw, error, pending, refresh } = useFetch<{ data: Creator }>(
    `/api/creators/@${handle}`,
    {
      baseURL: config.public.apiBase,
      key: `creator-${handle}`,
    },
  )

  const creator = computed(() => raw.value?.data ?? null)

  return {
    creator,
    error,
    pending,
    refresh,
  }
}
