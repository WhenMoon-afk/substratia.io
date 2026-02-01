export interface ModelInfo {
  name: string;
  context: number;
  inputPrice: number;
  outputPrice: number;
}

// Model context windows and pricing (per 1M tokens, updated Jan 2026)
export const models: ModelInfo[] = [
  {
    name: "Claude Opus 4.5",
    context: 200000,
    inputPrice: 5,
    outputPrice: 25,
  },
  {
    name: "Claude Sonnet 4.5",
    context: 200000,
    inputPrice: 3,
    outputPrice: 15,
  },
  {
    name: "Claude Haiku 4.5",
    context: 200000,
    inputPrice: 1,
    outputPrice: 5,
  },
  {
    name: "Claude Opus 4",
    context: 200000,
    inputPrice: 15,
    outputPrice: 75,
  },
  { name: "GPT-4o", context: 128000, inputPrice: 2.5, outputPrice: 10 },
  {
    name: "GPT-4 Turbo",
    context: 128000,
    inputPrice: 10,
    outputPrice: 30,
  },
];

// Simple token estimation (GPT-style: ~4 chars per token on average)
// More accurate would use tiktoken, but this is client-side friendly
export function estimateTokens(text: string): number {
  if (!text) return 0;
  // Better estimation: count words and punctuation
  const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);
  const wordTokens = words.reduce((acc, word) => {
    // Short words ~1 token, long words ~1 token per 4 chars
    if (word.length <= 4) return acc + 1;
    return acc + Math.ceil(word.length / 4);
  }, 0);
  // Add tokens for punctuation and special chars
  const specialChars = (text.match(/[^\w\s]/g) || []).length;
  return wordTokens + Math.ceil(specialChars / 2);
}

export interface TokenTip {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

export const tokenTips: TokenTip[] = [
  {
    title: "What are tokens?",
    description:
      "Tokens are pieces of text that AI models process. A token is roughly 4 characters or \u00BE of a word. \u201CHello world\u201D is about 2 tokens.",
  },
  {
    title: "Context Window",
    description:
      "The context window is the maximum tokens a model can process at once. Claude Sonnet 4.5 supports 200K tokens (~150K words).",
  },
  {
    title: "Save Context",
    description:
      "Running out of context? Use momentum to snapshot and restore your conversation state instantly.",
    linkText: "momentum",
    linkHref: "/templates",
  },
];
