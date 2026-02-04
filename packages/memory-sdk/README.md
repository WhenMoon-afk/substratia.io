# @substratia/memory

Memory for AI. 2 lines. That's it.

```typescript
import { remember } from '@substratia/memory'
await remember("User prefers dark mode")
```

## Installation

```bash
npm install @substratia/memory
```

## Setup

Set your API key as an environment variable:

```bash
export SUBSTRATIA_API_KEY=sk_your_key_here
```

Get a key at [substratia.io/dashboard](https://substratia.io/dashboard)

## Usage

### Remember (store)

```typescript
import { remember } from '@substratia/memory'

await remember("User prefers dark mode")
await remember("User is vegetarian", { importance: "high", tags: ["diet"] })
```

### Recall (search)

```typescript
import { recall } from '@substratia/memory'

const memories = await recall("diet preferences")
```

### Forget (delete)

```typescript
import { forget } from '@substratia/memory'

await forget("memory_id_here")
```

### Full API Access

```typescript
import { memory } from '@substratia/memory'

// List all memories
const all = await memory.list({ limit: 20 })

// Filter by importance
const critical = await memory.list({ importance: "critical" })

// Search
const results = await memory.search("preferences")

// Delete
await memory.delete(id)
```

### Custom Configuration

For multiple instances or custom API keys:

```typescript
import { Substratia } from '@substratia/memory'

const memory = new Substratia({ apiKey: 'sk_different_key' })
await memory.add("Custom instance memory")
```

## API Reference

### Simple Functions (2-line API)

| Function | Description |
|----------|-------------|
| `remember(content, options?)` | Store a memory |
| `recall(query, options?)` | Search memories |
| `forget(id)` | Delete a memory |

### Options

**remember() options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `context` | string | - | Additional context |
| `importance` | string | "normal" | critical, high, normal, low |
| `tags` | string[] | - | Categorization tags |

**recall() options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `limit` | number | 10 | Max results (max 50) |

### Class API

```typescript
const memory = new Substratia({ apiKey: 'sk_xxx' })

memory.add(content, options?)    // Store
memory.search(query, options?)   // Search
memory.list(options?)            // List all
memory.delete(id)                // Delete
```

## Works With Any AI

- OpenAI / ChatGPT
- Anthropic / Claude
- Google / Gemini
- Local LLMs (Ollama, LMStudio)
- Custom agents & frameworks

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SUBSTRATIA_API_KEY` | Yes* | Your API key (starts with sk_) |

*Not required if using `new Substratia({ apiKey })` directly.

## Related

- **[momentum](https://github.com/WhenMoon-afk/momentum)** - Context recovery for Claude Code
- **[memory-mcp](https://github.com/WhenMoon-afk/claude-memory-mcp)** - MCP server for Claude Desktop

## Links

- [Documentation](https://substratia.io/docs)
- [Dashboard](https://substratia.io/dashboard)
- [GitHub](https://github.com/WhenMoon-afk/substratia)

## License

MIT
