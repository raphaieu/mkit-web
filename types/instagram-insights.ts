/** GET /api/me/instagram/insights — InstagramInsightsResource */

export interface InsightSeriesPoint {
  date: string
  value: number
}

export interface InstagramInsightsPerformance {
  reach_28d: number | null
  accounts_engaged_28d: number | null
  total_interactions_28d: number | null
  profile_views_28d: number | null
  follower_count_delta_28d: number | null
  reach_series: InsightSeriesPoint[]
  accounts_engaged_series: InsightSeriesPoint[]
}

/** Chave → contagem (ex.: país, cidade, "25-34_F") */
export type InsightDemographicRow = Record<string, number>

export interface InstagramInsightsAudience {
  gender_age: InsightDemographicRow | null
  country: InsightDemographicRow | null
  city: InsightDemographicRow | null
}

export interface InstagramInsightsPayload {
  synced_at: string | null
  performance: InstagramInsightsPerformance
  audience: InstagramInsightsAudience
}
