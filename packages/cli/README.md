# @substratia-io/cli

Persistent memory for AI agents - command line interface.

## Installation

```bash
# Quick install (recommended)
curl -fsSL https://substratia.io/install | bash

# Or via npm/bun
npm install -g @substratia-io/cli
bun install -g @substratia-io/cli
```

## Quick Start

```bash
# 1. Register and get your API key
substratia register "your@email.com"

# 2. Store a memory
substratia learn "User prefers dark mode"

# 3. Search memories
substratia remember "preferences"

# 4. Full context restore
substratia bridge
```

## Commands

### `register <email>`

Register for an API key.

```bash
substratia register "you@example.com"
```

### `learn <content>`

Store a new memory.

```bash
substratia learn "Important information"
substratia learn "Critical fact" --importance critical
substratia learn "Tagged memory" --tags "tag1,tag2"
```

Options:

- `--importance`: `critical`, `high`, `normal`, `low` (default: `normal`)
- `--tags`: Comma-separated tags

### `remember <query>`

Search your memories.

```bash
substratia remember "user preferences"
substratia remember "project" --limit 5
```

Options:

- `--limit`: Maximum results to return (default: 10)

### `bridge`

Full context restore - retrieves memories, identity narratives, and preferences.

```bash
substratia bridge
```

### `config`

Show current configuration.

```bash
substratia config
```

## Environment Variables

- `SUBSTRATIA_API_KEY` - Your API key (overrides config file)

## Configuration

Config is stored in `~/.substratia/config.json`

## For Programmatic Use

Use [@substratia-io/memory](https://npmjs.com/package/@substratia-io/memory) instead:

```typescript
import { remember, recall } from "@substratia-io/memory";

await remember("User prefers dark mode");
const memories = await recall("preferences");
```

## Documentation

https://substratia.io/docs

## License

MIT
