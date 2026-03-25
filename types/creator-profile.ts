import type { CreatorProfilePublic } from '~/types/creator'

/** Corpo PUT /api/me/creator-profile */
export interface CreatorProfileUpdatePayload {
  contact_email?: string | null
  contact_whatsapp?: string | null
  city?: string | null
  theme?: CreatorProfilePublic['theme']
  niches?: string[]
  badges?: string[]
  instagram_url?: string | null
  tiktok_url?: string | null
  youtube_url?: string | null
  pinterest_url?: string | null
  twitter_url?: string | null
}
