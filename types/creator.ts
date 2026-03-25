import type { InstagramInsightsPayload } from '~/types/instagram-insights'

/** Origem do dado nas telas do dashboard (wireframe) */
export type BioDataSource = 'api' | 'manual' | 'calc'

/** Resposta GET /api/creators/{handle} (CreatorResource) */
export interface CreatorProfilePublic {
  contact_email: string | null
  contact_whatsapp: string | null
  city: string | null
  theme: 'gold' | 'rose' | 'ocean' | 'sage'
  niches: string[]
  badges: string[]
  social: {
    instagram: string | null
    tiktok: string | null
    youtube: string | null
    pinterest: string | null
    twitter: string | null
  }
}

export interface InstagramPost {
  instagram_media_id: string
  media_type: string
  media_url: string
  thumbnail_url: string | null
  permalink: string
  caption: string | null
  like_count: number
  comments_count: number
  timestamp: string
}

export interface CreatorInstagram {
  username: string
  full_name: string | null
  biography: string | null
  profile_picture_url: string | null
  followers_count: number
  following_count: number
  media_count: number
  engagement_rate: number | null
  last_synced_at: string | null
  posts: InstagramPost[]
}

/** portfolio_posts — experiências / trabalhos (PortfolioPostResource) */
export interface PortfolioItem {
  id: number
  title: string
  description: string | null
  image_url: string | null
  partner_name: string | null
  collaboration_type: string | null
  reach: string | null
  engagement_rate_text: string | null
  deliverables: string | null
  published_at: string | null
  order: number | null
}

export interface PartnerBrand {
  id: number
  name: string
  category: string | null
  emoji: string | null
  order: number | null
}

export interface CreatorLink {
  id: number
  emoji: string | null
  title: string
  description: string | null
  url: string
  order: number | null
  active: boolean
}

export interface Creator {
  name: string
  handle: string
  plan: 'free' | 'pro'
  profile: CreatorProfilePublic | null
  instagram: CreatorInstagram | null
  experiences: PortfolioItem[]
  partner_brands: PartnerBrand[]
  links: CreatorLink[]
  insights: InstagramInsightsPayload | null
}
