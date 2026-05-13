// FAQ structured data - extracted from app/faq/page.tsx
// Plain text data for all FAQs; JSX-rich answers are composed in the page component

export type FAQCategory = "general" | "tools" | "technical";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  /** Optional code snippet shown inline in the answer */
  code?: string;
}

export interface FAQCategoryTab {
  id: "all" | FAQCategory;
  label: string;
}

export const categories: FAQCategoryTab[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "tools", label: "Tools" },
  { id: "technical", label: "Technical" },
];

export const faqs: FAQItem[] = [
  // General
  {
    id: "what-is-claude-code",
    category: "general",
    question: "What is Claude Code?",
    answer:
      "Claude Code is Anthropic's official CLI tool for AI-assisted software development. It allows developers to interact with Claude directly from the terminal to write, edit, and debug code. It's available with Claude Pro ($20/mo) and Claude Max ($100-200/mo) subscriptions.",
  },
  {
    id: "what-is-substratia",
    category: "general",
    question: "What is Substratia?",
    answer:
      "Substratia is memory infrastructure for AI agents. Every context reset is amnesia — your agent loses who they are, what they've learned, and who you are to them. Substratia gives agents persistent memory so they wake up whole. Local-first, open-source, and works with any agent framework.",
  },
  {
    id: "are-tools-free",
    category: "general",
    question: "Are these tools free?",
    answer:
      "Yes, all tools are completely free and open source under the MIT license. This includes momentum, memory-mcp, and all web tools at substratia.io/tools. They will remain free forever.",
  },
  // Tools
  {
    id: "what-is-momentum",
    category: "tools",
    question: "What is momentum?",
    answer:
      "momentum is a Claude Code plugin for fast context recovery. It takes snapshots of your working state and can restore them in under 5 milliseconds after using /clear.",
    code: "/plugin install momentum@substratia-marketplace",
  },
  {
    id: "what-is-memory-mcp",
    category: "tools",
    question: "What is memory-mcp?",
    answer:
      "memory-mcp is an MCP server that gives Claude persistent memory across sessions. Claude can store facts, recall information, and search memories using natural language. It uses SQLite with FTS5 full-text search.",
    code: "npx @whenmoon-afk/memory-mcp",
  },
  {
    id: "momentum-vs-memory-mcp",
    category: "tools",
    question: "What's the difference between momentum and memory-mcp?",
    answer:
      "momentum is for short-term context recovery within sessions (snapshot your work, restore after /clear). memory-mcp is for long-term persistent memory across sessions (store facts, recall them tomorrow). They work together as complementary tools.",
  },
  {
    id: "need-both-tools",
    category: "tools",
    question: "Do I need both momentum and memory-mcp?",
    answer:
      "No, they serve different purposes. Use momentum if you want fast context recovery within sessions. Use memory-mcp if you want Claude to remember facts across sessions. Many users find value in both.",
  },
  {
    id: "where-is-data-stored",
    category: "tools",
    question: "Where is my data stored?",
    answer:
      "All data is stored locally on your machine in SQLite databases. momentum stores snapshots in ~/.local/share/momentum/ (Linux/macOS) or %LOCALAPPDATA%/momentum (Windows). memory-mcp stores memories in a similar location. Nothing is sent to the cloud.",
  },
  // Technical
  {
    id: "context-window",
    category: "technical",
    question: "What is a context window?",
    answer:
      "The context window is Claude's working memory during a conversation-approximately 200,000 tokens. Everything you say, files Claude reads, and Claude's responses consume context. When it fills up, Claude compacts (summarizes) the conversation, which can lose details.",
  },
  {
    id: "what-is-compaction",
    category: "technical",
    question: "What is compaction?",
    answer:
      "When the context window fills up, Claude Code automatically summarizes the conversation to free up space. This is called compaction. It's lossy-details get dropped. Tools like momentum help preserve context across compaction events.",
  },
  {
    id: "what-is-claude-md",
    category: "technical",
    question: "What is CLAUDE.md?",
    answer:
      'CLAUDE.md is a configuration file in your project root that gives Claude context about your project. It survives compaction and is read at the start of every session. Include project overview, coding standards, key directories, and a "Do NOT" section for constraints.',
  },
  {
    id: "what-is-mcp",
    category: "technical",
    question: "What is MCP?",
    answer:
      "MCP (Model Context Protocol) is a standard for connecting AI assistants to external tools and data sources. MCP servers like memory-mcp add capabilities to Claude Code. They're configured in ~/.claude/claude_desktop_config.json.",
  },
  {
    id: "why-sqlite",
    category: "technical",
    question: "Why SQLite instead of a vector database?",
    answer:
      "For most AI memory use cases, SQLite with FTS5 (full-text search) is sufficient and has major advantages: instant startup, zero dependencies, no API costs, works offline, and data stays on your machine. Vector embeddings add complexity without proportional benefit for typical usage.",
  },
];
