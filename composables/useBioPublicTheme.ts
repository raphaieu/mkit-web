import type { CreatorProfilePublic } from '~/types/creator'

const THEMES = new Set(['gold', 'rose', 'ocean', 'sage'])

export function bioPageThemeClass(profile: CreatorProfilePublic | null | undefined): string {
  const t = profile?.theme ?? 'gold'
  return THEMES.has(t) ? `bio-theme--${t}` : 'bio-theme--gold'
}
