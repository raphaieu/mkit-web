/**
 * Runs before middleware (client-side only).
 * Extracts ?token= from the URL after Instagram OAuth redirect,
 * stores it in a cookie, and cleans the URL.
 */
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const router = useRouter()
  const rawToken = route.query.token

  if (rawToken && typeof rawToken === 'string') {
    const cookie = useCookie<string | null>('mkit_token', {
      maxAge: 60 * 60 * 24 * 60, // 60 days (matches Instagram long-lived token)
      path: '/',
      sameSite: 'lax',
    })
    cookie.value = rawToken

    const query = { ...route.query }
    delete query.token
    router.replace({ query })
  }
})
