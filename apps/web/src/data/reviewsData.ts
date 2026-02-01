// Shared types for all review pages

export interface ScoreBasedItem {
  name: string;
  company: string;
  pricing: string;
  bestFor: string;
  scores: Record<string, number>;
  pros: string[];
  cons: string[];
  extras?: Record<string, string>;
}

export interface RatingBasedItem {
  name: string;
  tagline: string;
  pricing: string;
  pricingDetails: string;
  bestFor: string;
  features: string[];
  limitations: string[];
  verdict: string;
  rating: number;
  url: string;
}

export interface Recommendation {
  title: string;
  pick: string;
  description: string;
  gradient: "cyan" | "purple" | "green" | "yellow";
}

export interface ReviewCta {
  title: string;
  description: string;
  links: {
    href: string;
    label: string;
    variant: "primary" | "secondary" | "ghost";
  }[];
}

export interface RelatedLink {
  href: string;
  label: string;
}

export interface ReviewPageConfig {
  backLabel?: string;
  backHref: string;
  shareTitle: string;
  heading: string;
  headingAccent: string;
  subtitle: string;
  lastUpdated: string;
  itemCount: number;
  author?: string;
  downloadFilename: string;
}

// --- AI Video Generators ---

export interface VideoGenerator extends ScoreBasedItem {
  duration: string;
  features: string[];
}

export const videoGenerators: VideoGenerator[] = [
  {
    name: "Runway Gen-3 Alpha",
    company: "Runway",
    pricing: "$12-76/month",
    bestFor: "Professional video production",
    scores: { quality: 95, motion: 92, ease: 85 },
    duration: "10-18 sec",
    pros: [
      "Best overall video quality",
      "Excellent motion coherence",
      "Advanced camera controls",
      "Professional-grade output",
    ],
    cons: [
      "Most expensive option",
      "Credit-based system",
      "Longer generation times",
      "Limited free tier",
    ],
    features: [
      "Text-to-video",
      "Image-to-video",
      "Camera controls",
      "Motion brush",
      "Video extension",
    ],
  },
  {
    name: "Pika Labs 1.5",
    company: "Pika",
    pricing: "$8-58/month",
    bestFor: "Creative, stylized videos",
    scores: { quality: 88, motion: 85, ease: 90 },
    duration: "3-4 sec",
    pros: [
      "Good balance of quality and price",
      "Creative style options",
      "Fast generation",
      "User-friendly interface",
    ],
    cons: [
      "Shorter video duration",
      "Less realistic than Runway",
      "Limited camera control",
      "Occasional artifacts",
    ],
    features: [
      "Text-to-video",
      "Image-to-video",
      "Style presets",
      "Sound effects",
      "Lip sync",
    ],
  },
  {
    name: "Luma Dream Machine",
    company: "Luma AI",
    pricing: "$24-100/month",
    bestFor: "Realistic motion, complex scenes",
    scores: { quality: 90, motion: 90, ease: 80 },
    duration: "5-10 sec",
    pros: [
      "Very realistic motion",
      "Good at complex scenes",
      "Camera movement support",
      "Improving rapidly",
    ],
    cons: [
      "Can struggle with humans",
      "Variable quality",
      "Higher pricing tier",
      "Newer platform",
    ],
    features: [
      "Text-to-video",
      "Image-to-video",
      "Camera motion",
      "Keyframe control",
      "Video extension",
    ],
  },
  {
    name: "Kling AI",
    company: "Kuaishou",
    pricing: "Free tier / Credits",
    bestFor: "Long-form video, value",
    scores: { quality: 85, motion: 82, ease: 75 },
    duration: "Up to 2 min",
    pros: [
      "Longest video duration",
      "Good free tier",
      "Improving quality",
      "Multiple aspect ratios",
    ],
    cons: [
      "Quality behind leaders",
      "Inconsistent results",
      "Less intuitive interface",
      "Limited English support",
    ],
    features: [
      "Text-to-video",
      "Image-to-video",
      "Long-form generation",
      "Character consistency",
    ],
  },
  {
    name: "Grok Video",
    company: "xAI",
    pricing: "$8-16/month (X Premium)",
    bestFor: "Quick generation, social content",
    scores: { quality: 80, motion: 78, ease: 92 },
    duration: "5-10 sec",
    pros: [
      "Very fast generation",
      "Easy to use",
      "Integrated with X",
      "Good for quick content",
    ],
    cons: [
      "Lower quality than leaders",
      "Limited controls",
      "Requires X subscription",
      "Fewer features",
    ],
    features: ["Text-to-video", "Quick generation", "Social media integration"],
  },
];

export const videoGeneratorRecommendations: Recommendation[] = [
  {
    title: "Best Overall Quality",
    pick: "Runway Gen-3 Alpha",
    description:
      "For professional-grade video with the best motion coherence and camera controls. Worth the premium for serious creators.",
    gradient: "purple",
  },
  {
    title: "Best Value",
    pick: "Pika Labs 1.5",
    description:
      "Great balance of quality, features, and price. Fast generation and creative style options make it perfect for most users.",
    gradient: "cyan",
  },
  {
    title: "Best Free Option",
    pick: "Kling AI",
    description:
      "Generous free tier and the longest video duration available. Quality is improving rapidly with each update.",
    gradient: "green",
  },
  {
    title: "Fastest & Easiest",
    pick: "Grok Video",
    description:
      "For quick social media content without the learning curve. Integrated with X for seamless sharing.",
    gradient: "yellow",
  },
];

export const videoGeneratorCta: ReviewCta = {
  title: "Plan Your Video Scenes",
  description:
    "Use our free Video Prompt Timeline to plan your video scene by scene. Build prompts for 7 keyframes, export for any platform.",
  links: [
    {
      href: "/tools/video-prompt-timeline",
      label: "Try Video Prompt Timeline",
      variant: "primary",
    },
  ],
};

export const videoGeneratorRelated: RelatedLink[] = [
  { href: "/reviews/ai-image-generators", label: "AI Image Generators" },
  { href: "/blog/memory-mcp-vs-alternatives", label: "MCP Memory Servers" },
];

// --- AI Image Generators ---

export interface ImageGenerator extends ScoreBasedItem {
  promptStyle: string;
}

export const imageGenerators: ImageGenerator[] = [
  {
    name: "Midjourney v6.1",
    company: "Midjourney",
    pricing: "$10-60/month",
    bestFor: "Artistic, stylized images",
    scores: { quality: 95, speed: 80, ease: 75, control: 85 },
    pros: [
      "Best aesthetic quality overall",
      "Excellent at artistic styles",
      "Strong community and resources",
      "Consistent, reliable output",
    ],
    cons: [
      "Discord-only interface",
      "No API access",
      "Limited fine control",
      "Subscription required",
    ],
    promptStyle: "Natural language with --ar, --v, --stylize parameters",
  },
  {
    name: "DALL-E 3",
    company: "OpenAI",
    pricing: "$20/month (ChatGPT Plus)",
    bestFor: "Text rendering, following instructions",
    scores: { quality: 90, speed: 85, ease: 95, control: 70 },
    pros: [
      "Best text rendering in images",
      "Excellent instruction following",
      "Easy to use via ChatGPT",
      "API available",
    ],
    cons: [
      "Less artistic than Midjourney",
      "Content restrictions",
      "Limited style control",
      "No negative prompts",
    ],
    promptStyle: "Natural language descriptions, ChatGPT enhances prompts",
  },
  {
    name: "Stable Diffusion XL",
    company: "Stability AI",
    pricing: "Free (local) / $10+/month (hosted)",
    bestFor: "Maximum control, local generation",
    scores: { quality: 88, speed: 70, ease: 50, control: 98 },
    pros: [
      "Free and open source",
      "Run locally, full privacy",
      "Extensive customization",
      "Huge community of models",
    ],
    cons: [
      "Requires technical setup",
      "Needs powerful GPU",
      "Steeper learning curve",
      "Inconsistent quality without tuning",
    ],
    promptStyle: "Weighted syntax (keyword:1.2), extensive negative prompts",
  },
  {
    name: "Grok (xAI)",
    company: "xAI",
    pricing: "$8-16/month (X Premium)",
    bestFor: "Quick generation, integrated with X",
    scores: { quality: 85, speed: 90, ease: 90, control: 65 },
    pros: [
      "Very fast generation",
      "Integrated with X/Twitter",
      "Good general quality",
      "Also does video generation",
    ],
    cons: [
      "Less refined than Midjourney",
      "Requires X subscription",
      "Limited style options",
      "Newer, less documented",
    ],
    promptStyle: "Natural language, simple and direct",
  },
  {
    name: "Flux",
    company: "Black Forest Labs",
    pricing: "Free tier / Pay-per-use",
    bestFor: "Photorealism, faces",
    scores: { quality: 92, speed: 75, ease: 80, control: 80 },
    pros: [
      "Excellent photorealism",
      "Great at human faces",
      "Good free tier",
      "Multiple model variants",
    ],
    cons: [
      "Newer, less mature ecosystem",
      "Limited artistic styles",
      "Fewer resources/tutorials",
      "Variable availability",
    ],
    promptStyle: "Natural language with detailed descriptions",
  },
];

export const imageGeneratorRecommendations: Recommendation[] = [
  {
    title: "Best Overall Quality",
    pick: "Midjourney v6.1",
    description:
      "For pure aesthetic quality and artistic output, Midjourney remains the leader. If you want images that look like professional artwork, this is your choice.",
    gradient: "purple",
  },
  {
    title: "Best for Beginners",
    pick: "DALL-E 3",
    description:
      "Integrated into ChatGPT, DALL-E 3 is the easiest to use. Just describe what you want in plain English. Great text rendering too.",
    gradient: "cyan",
  },
  {
    title: "Best Free Option",
    pick: "Stable Diffusion XL",
    description:
      "Run it locally for free with full control. Requires technical setup and a good GPU, but offers unmatched customization.",
    gradient: "green",
  },
  {
    title: "Best for Photorealism",
    pick: "Flux",
    description:
      "For photorealistic images, especially human faces, Flux produces remarkably realistic results. Great free tier available.",
    gradient: "yellow",
  },
];

export const imageGeneratorCta: ReviewCta = {
  title: "Build Better Prompts",
  description:
    "Use our free Image Prompt Generator to craft prompts optimized for any of these platforms. 50+ style presets, negative prompts, and platform-specific formatting.",
  links: [
    {
      href: "/tools/image-prompt-generator",
      label: "Try Image Prompt Generator",
      variant: "primary",
    },
  ],
};

export const imageGeneratorRelated: RelatedLink[] = [
  { href: "/reviews/ai-video-generators", label: "AI Video Generators" },
  { href: "/blog/memory-mcp-vs-alternatives", label: "MCP Memory Servers" },
];

// --- AI Coding Assistants ---

export const codingAssistants: RatingBasedItem[] = [
  {
    name: "Claude Code",
    tagline: "Agentic coding with deep reasoning",
    pricing: "$20-200/month",
    pricingDetails: "Pro $20, Max $100, Max+ $200. API available.",
    bestFor: "Complex refactoring, multi-file changes, autonomous tasks",
    features: [
      "Full agentic capabilities (file creation, terminal commands)",
      "Extended thinking with ultrathink/thinkhard modes",
      "Multi-file awareness and refactoring",
      "Git integration and commit generation",
      "Subagent spawning for parallel tasks",
      "Context recovery with momentum plugin",
    ],
    limitations: [
      "CLI-based (no IDE integration yet)",
      "Context window limitations on long sessions",
      "Requires explicit permission grants",
      "Learning curve for prompt optimization",
    ],
    verdict:
      "The most capable agentic coding assistant. Best for complex, multi-step tasks where you need Claude to work autonomously.",
    rating: 9,
    url: "https://claude.ai/code",
  },
  {
    name: "Cursor",
    tagline: "AI-first code editor",
    pricing: "$20/month",
    pricingDetails: "Pro plan. Free tier with limited requests.",
    bestFor: "Daily coding with inline assistance, quick edits",
    features: [
      "Full IDE (VS Code fork) with AI built-in",
      "Inline code completion (Tab to accept)",
      "Chat with codebase context",
      "Cmd+K for inline edits",
      "Multi-file editing in composer",
      "Multiple model support (Claude, GPT-4)",
    ],
    limitations: [
      "Must use their editor (not a plugin)",
      "Agentic features still maturing",
      "Can be expensive at scale",
      "Occasional hallucinations in suggestions",
    ],
    verdict:
      "Excellent for developers who want AI deeply integrated into their editor. Great balance of assistance and control.",
    rating: 8,
    url: "https://cursor.com",
  },
  {
    name: "GitHub Copilot",
    tagline: "Your AI pair programmer",
    pricing: "$10-39/month",
    pricingDetails: "Individual $10, Business $19, Enterprise $39.",
    bestFor: "Code completion, boilerplate generation",
    features: [
      "Works in VS Code, JetBrains, Neovim",
      "Fast inline completions",
      "Chat interface with @workspace",
      "PR summaries and code review",
      "Enterprise security and compliance",
      "Copilot Workspace for planning",
    ],
    limitations: [
      "Less capable at complex reasoning",
      "Context window smaller than competitors",
      "Chat less sophisticated than Claude",
      "Limited agentic capabilities",
    ],
    verdict:
      "The industry standard for code completion. Great for teams needing enterprise features and broad IDE support.",
    rating: 7,
    url: "https://github.com/features/copilot",
  },
  {
    name: "Codeium",
    tagline: "Free AI coding assistant",
    pricing: "Free / $15/month",
    pricingDetails: "Generous free tier. Teams plan for advanced features.",
    bestFor: "Budget-conscious developers, students",
    features: [
      "Free unlimited autocomplete",
      "Chat with codebase context",
      "70+ IDE integrations",
      "In-editor search (Codeium Search)",
      "Self-hosted option available",
      "Fine-tuning on your code",
    ],
    limitations: [
      "Quality slightly below Copilot/Cursor",
      "Less sophisticated reasoning",
      "Fewer advanced features",
      "Smaller community",
    ],
    verdict:
      "Best free option available. Surprisingly capable for $0, making it ideal for students and budget-conscious teams.",
    rating: 7,
    url: "https://codeium.com",
  },
  {
    name: "Windsurf (Codeium)",
    tagline: "Agentic IDE by Codeium",
    pricing: "$15/month",
    pricingDetails: "Pro plan includes Cascade agentic features.",
    bestFor: "Agentic coding with IDE comfort",
    features: [
      "Full IDE (VS Code fork)",
      "Cascade: autonomous multi-step actions",
      "Flows: AI-guided workflows",
      "Deep codebase understanding",
      "Terminal command execution",
      "Built on Codeium infrastructure",
    ],
    limitations: [
      "Newer product, still maturing",
      "Must use their editor",
      "Cascade quality inconsistent",
      "Competing with Cursor",
    ],
    verdict:
      "Promising Cursor alternative with unique Cascade feature. Worth trying for the agentic capabilities at a competitive price.",
    rating: 7,
    url: "https://codeium.com/windsurf",
  },
];

export const codingAssistantRecommendations: Recommendation[] = [
  {
    title: "For Complex Tasks",
    pick: "Claude Code",
    description:
      "Best for multi-file refactoring, autonomous coding, and complex reasoning tasks.",
    gradient: "cyan",
  },
  {
    title: "For Daily Coding",
    pick: "Cursor",
    description:
      "Best for developers who want AI deeply integrated into their editing workflow.",
    gradient: "purple",
  },
  {
    title: "For Budget",
    pick: "Codeium",
    description:
      "Best free option with surprisingly capable autocomplete and chat features.",
    gradient: "green",
  },
];

export const codingAssistantCta: ReviewCta = {
  title: "Optimize Your Claude Code Prompts",
  description: "Using Claude Code? Our tools help you get the most out of it.",
  links: [
    {
      href: "/tools/prompt-optimizer",
      label: "Prompt Optimizer",
      variant: "primary",
    },
    {
      href: "/tools/cost-calculator",
      label: "Cost Calculator",
      variant: "secondary",
    },
    { href: "/tools", label: "All Tools", variant: "ghost" },
  ],
};

// --- Markdown Editors ---

export const markdownEditors: RatingBasedItem[] = [
  {
    name: "Obsidian",
    tagline: "A second brain, for you, forever",
    pricing: "Free / $50/year",
    pricingDetails: "Free for personal use. Sync $4/mo, Publish $8/mo.",
    bestFor: "Knowledge management, linked notes, PKM enthusiasts",
    features: [
      "Local-first (your files, your control)",
      "Powerful linking with [[backlinks]]",
      "Graph view for visualizing connections",
      "Massive plugin ecosystem (1000+)",
      "Canvas for visual note-taking",
      "Works offline, syncs via your choice",
    ],
    limitations: [
      "Learning curve for beginners",
      "Mobile apps less polished",
      "Sync requires payment or DIY",
      "Can become overwhelming with plugins",
    ],
    verdict:
      "The gold standard for personal knowledge management. Best for power users who want full control over their notes.",
    rating: 9,
    url: "https://obsidian.md",
  },
  {
    name: "Notion",
    tagline: "All-in-one workspace",
    pricing: "Free / $10/month",
    pricingDetails: "Free for personal. Plus $10/mo, Business $15/mo.",
    bestFor: "Team collaboration, databases, project management",
    features: [
      "Databases with multiple views",
      "Real-time collaboration",
      "Templates for everything",
      "API for integrations",
      "AI features built-in",
      "Beautiful, polished interface",
    ],
    limitations: [
      "Cloud-only (no offline mode)",
      "Not pure markdown (proprietary format)",
      "Can be slow with large workspaces",
      "Export limitations",
    ],
    verdict:
      "Best for teams and those who need databases alongside notes. Less suitable for markdown purists.",
    rating: 8,
    url: "https://notion.so",
  },
  {
    name: "Typora",
    tagline: "A minimal markdown editor",
    pricing: "$14.99 (one-time)",
    pricingDetails: "One-time purchase. Free trial available.",
    bestFor: "Distraction-free writing, clean exports",
    features: [
      "True WYSIWYG markdown",
      "Live preview while typing",
      "Clean, minimal interface",
      "Excellent export (PDF, Word, HTML)",
      "Custom themes",
      "Focus and typewriter modes",
    ],
    limitations: [
      "No built-in sync",
      "Single file focus (no vault)",
      "Limited organization features",
      "No mobile version",
    ],
    verdict:
      "The purest markdown writing experience. Perfect for writers who just want to write without distractions.",
    rating: 8,
    url: "https://typora.io",
  },
  {
    name: "VS Code",
    tagline: "Code editor with great markdown support",
    pricing: "Free",
    pricingDetails: "Completely free and open source.",
    bestFor: "Developers, documentation, README files",
    features: [
      "Free and open source",
      "Excellent extensions (Markdown All in One, etc.)",
      "Git integration built-in",
      "Live preview side-by-side",
      "Snippets and shortcuts",
      "Works with any file system",
    ],
    limitations: [
      "Not designed for notes/PKM",
      "Requires extensions for good experience",
      "Overkill for simple writing",
      "No graph or backlinks without extensions",
    ],
    verdict:
      "Already using VS Code? It handles markdown excellently with the right extensions. Best for developers.",
    rating: 7,
    url: "https://code.visualstudio.com",
  },
  {
    name: "iA Writer",
    tagline: "The focused writing app",
    pricing: "$49.99 (one-time)",
    pricingDetails: "One-time per platform. Family sharing available.",
    bestFor: "Professional writers, long-form content",
    features: [
      "Beautiful, distraction-free design",
      "Focus mode highlights current sentence",
      "Syntax highlighting for markdown",
      "iCloud/Dropbox sync",
      "Excellent typography",
      "Cross-platform (Mac, Windows, iOS, Android)",
    ],
    limitations: [
      "Expensive for casual users",
      "Separate purchase per platform",
      "No linking/backlinks",
      "Limited organization",
    ],
    verdict:
      "Premium writing experience for serious writers. The typography and focus features are unmatched.",
    rating: 8,
    url: "https://ia.net/writer",
  },
];

export const markdownEditorRecommendations: Recommendation[] = [
  {
    title: "For Knowledge Management",
    pick: "Obsidian",
    description:
      "Best for building a personal knowledge base with linked notes and powerful organization.",
    gradient: "cyan",
  },
  {
    title: "For Teams",
    pick: "Notion",
    description:
      "Best for collaborative workspaces combining notes, databases, and project management.",
    gradient: "purple",
  },
  {
    title: "For Writers",
    pick: "Typora",
    description:
      "Best for distraction-free writing with beautiful WYSIWYG markdown editing.",
    gradient: "green",
  },
];

export const markdownEditorCta: ReviewCta = {
  title: "Try Our Markdown Tools",
  description:
    "Preview your markdown or strip formatting instantly with our free tools.",
  links: [
    {
      href: "/tools/markdown-preview",
      label: "Markdown Preview",
      variant: "primary",
    },
    {
      href: "/tools/markdown-stripper",
      label: "Markdown Stripper",
      variant: "secondary",
    },
    { href: "/tools", label: "All Tools", variant: "ghost" },
  ],
};
