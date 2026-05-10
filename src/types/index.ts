export interface User {
  id: string
  email: string
  name: string
  created_at: string
  subscription: 'free' | 'pro' | 'year'
  expires_at: string | null
}

export interface Brand {
  id: string
  user_id: string
  name: string
  industry: string
  product: string
  city: string
  competitors: string[]
  price_range: string
  highlights: string
  created_at: string
}

export interface Query {
  id: string
  brand_id: string
  query_text: string
  query_type: 'generic' | 'industry' | 'custom' | 'longtail'
  search_intent: string
  created_at: string
}

export interface DetectionResult {
  id: string
  query_id: string
  brand_id: string
  platform: 'doubao' | 'qianwen' | 'deepseek' | 'metaso'
  is_recommended: boolean
  sentiment: 'positive' | 'neutral' | 'negative'
  ai_content: string
  checked_at: string
}

export interface Report {
  id: string
  brand_id: string
  visible_score: number
  recommended_count: number
  competitor_count: number
  issues: Issue[]
  suggestions: Suggestion[]
  created_at: string
}

export interface Issue {
  id: string
  type: 'missing' | 'incorrect' | 'incomplete'
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface Suggestion {
  id: string
  type: 'content' | 'structural' | 'platform'
  description: string
  priority: 'high' | 'medium' | 'low'
}