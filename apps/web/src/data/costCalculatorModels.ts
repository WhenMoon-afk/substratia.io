// Claude API model pricing — extracted from tools/cost-calculator/page.tsx
// Single source of truth for model names and per-token pricing
// Update this file when Anthropic changes API pricing

export interface Model {
  id: string
  name: string
  /** Cost per 1M input tokens in USD */
  inputPer1M: number
  /** Cost per 1M output tokens in USD */
  outputPer1M: number
}

/** Current Claude API pricing as of January 2026 */
export const models: Model[] = [
  { id: 'opus-4.5', name: 'Claude Opus 4.5', inputPer1M: 5, outputPer1M: 25 },
  { id: 'opus-4.1', name: 'Claude Opus 4.1', inputPer1M: 15, outputPer1M: 75 },
  { id: 'opus-4', name: 'Claude Opus 4', inputPer1M: 15, outputPer1M: 75 },
  { id: 'sonnet-4.5', name: 'Claude Sonnet 4.5', inputPer1M: 3, outputPer1M: 15 },
  { id: 'sonnet-4', name: 'Claude Sonnet 4', inputPer1M: 3, outputPer1M: 15 },
  { id: 'haiku-4.5', name: 'Claude Haiku 4.5', inputPer1M: 1, outputPer1M: 5 },
  { id: 'haiku-3.5', name: 'Claude Haiku 3.5', inputPer1M: 0.80, outputPer1M: 4 },
  { id: 'haiku-3', name: 'Claude Haiku 3', inputPer1M: 0.25, outputPer1M: 1.25 },
]

/** Default model ID for new sessions and comparisons */
export const DEFAULT_MODEL_ID = 'sonnet-4.5'

/** Model used in API cost comparison (most common API model) */
export const COMPARISON_SONNET_ID = 'sonnet-4.5'

/** Model used in API cost comparison (premium tier) */
export const COMPARISON_OPUS_ID = 'opus-4.5'

/** Claude Max subscription cost (USD/month) */
export const MAX_SUBSCRIPTION_COST = 200

export function findModel(id: string): Model {
  return models.find(m => m.id === id) ?? models.find(m => m.id === DEFAULT_MODEL_ID)!
}

export function calculateCost(inputTokens: number, outputTokens: number, model: Model): number {
  return (inputTokens / 1_000_000) * model.inputPer1M + (outputTokens / 1_000_000) * model.outputPer1M
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}
