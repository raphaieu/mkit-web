export interface InstagramProfile {
  id: string
  username: string
  name: string
  biography: string
  profilePictureUrl: string
  followersCount: number
  followsCount: number
  mediaCount: number
}

export interface InstagramMedia {
  id: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  mediaUrl: string
  thumbnailUrl: string | null
  permalink: string
  caption: string | null
  likesCount: number
  commentsCount: number
  timestamp: string
}
