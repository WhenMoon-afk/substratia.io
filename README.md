# Substratia

**Memory infrastructure for AI** — Intelligence is substrate-agnostic.

## Live Site

[https://substratia.io](https://substratia.io)

## Features

### Memory Tools
- **momentum** - Fast context recovery (<5ms restore time)
- **memory-mcp** - Persistent memory across sessions
- **AgentForge** - Visual drag-and-drop builder for CLAUDE.md files

### Free Tools
- **Token Counter** - Estimate costs for Claude, GPT-4, and other models
- **Prompt Library** - 16 curated prompts for productivity and creativity
- **Seed Maker** - High-entropy random string generator

### Blog
10 posts including original research on AI behavior:
- The Eleanor Chen Effect (AI creativity convergence)
- Mirror Demons (AI delusion amplification)
- Technical architecture deep-dives

## Getting Started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 14 (App Router, Static Export)
- TypeScript
- Tailwind CSS 3.4
- @dnd-kit (drag and drop)
- Bun (package manager and runtime)
- Cloudflare Pages (hosting)

## Deployment

Push to master → Cloudflare Pages auto-deploys in ~90s

```bash
git add -A && git commit -m "feat: description" && git push origin master
```

## Related Projects

| Project | Description | Repo |
|---------|-------------|------|
| momentum | Context recovery plugin | [GitHub](https://github.com/WhenMoon-afk/momentum) |
| memory-mcp | Persistent memory MCP | [GitHub](https://github.com/WhenMoon-afk/claude-memory-mcp) |
| substratia-marketplace | Plugin distribution | [GitHub](https://github.com/WhenMoon-afk/substratia-marketplace) |

## License

MIT
