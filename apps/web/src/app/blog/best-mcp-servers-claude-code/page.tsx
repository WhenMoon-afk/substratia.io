import Link from "next/link";
import { BlogHeader, BlogAuthor, RelatedPosts } from "@/components/blog";

export default function BlogPost() {
  return (
    <main className="min-h-screen text-white">
      <article className="container mx-auto px-4 py-12 max-w-3xl">
        <BlogHeader
          title="Best MCP Servers for Claude Code in 2026: The Complete Guide"
          date="March 1, 2026"
          readTime="16 min read"
          tags={[
            { label: "MCP", color: "cyan" },
            { label: "Claude Code", color: "cyan" },
            { label: "Guide", color: "cyan" },
          ]}
        />

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-gray-300 mb-8">
            MCP servers turn Claude Code from a smart assistant into a connected
            powerhouse. They let Claude read your database, manage your GitHub
            repos, search the web, and remember things across sessions&mdash;all
            through a standard protocol. Here are the servers that actually
            matter in 2026, with honest assessments of each.
          </p>

          {/* ── What is MCP ─────────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            What Is MCP?
          </h2>
          <p className="text-gray-300 mb-4">
            The Model Context Protocol (MCP) is an open standard that lets AI
            models connect to external tools and data sources. Think of it as
            USB-C for AI&mdash;a single protocol that works across tools,
            databases, APIs, and services. Claude Code has native MCP support,
            meaning you can add servers to your{" "}
            <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
              .claude/settings.json
            </code>{" "}
            and Claude automatically discovers and uses them.
          </p>

          {/* ── How to install ──────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            How to Install MCP Servers
          </h2>
          <p className="text-gray-300 mb-4">
            Most MCP servers install the same way. Add them to your Claude Code
            settings:
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`# Via Claude Code CLI
claude mcp add <server-name> -- npx -y <package-name>

# Or edit ~/.claude/settings.json directly
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "package-name"]
    }
  }
}`}</code>
          </pre>
          <p className="text-gray-300 mb-4">
            Project-specific servers go in{" "}
            <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
              .claude/settings.json
            </code>{" "}
            at the repo root. Global servers go in{" "}
            <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
              ~/.claude/settings.json
            </code>
            . Claude Code also supports MCP Tool Search, which lazy-loads
            server tools on demand and reduces context usage by up to 95%.
          </p>

          {/* ── Comparison table ────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-8 mb-4 text-forge-cyan">
            Quick Comparison
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-2">Server</th>
                  <th className="text-left py-3 px-2">Category</th>
                  <th className="text-left py-3 px-2">Install</th>
                  <th className="text-left py-3 px-2">Best For</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold text-forge-cyan">
                    memory-mcp
                  </td>
                  <td className="py-3 px-2">Memory</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">npx -y memory-mcp</code>
                  </td>
                  <td className="py-3 px-2">
                    Persistent identity &amp; learnings
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Context7</td>
                  <td className="py-3 px-2">Context</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @upstash/context7-mcp
                    </code>
                  </td>
                  <td className="py-3 px-2">Up-to-date library docs</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">GitHub</td>
                  <td className="py-3 px-2">Dev Tools</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-github
                    </code>
                  </td>
                  <td className="py-3 px-2">
                    PRs, issues, repo management
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Filesystem</td>
                  <td className="py-3 px-2">Dev Tools</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-filesystem
                    </code>
                  </td>
                  <td className="py-3 px-2">
                    File ops outside project dir
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">PostgreSQL</td>
                  <td className="py-3 px-2">Database</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-postgres
                    </code>
                  </td>
                  <td className="py-3 px-2">Query production databases</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">SQLite</td>
                  <td className="py-3 px-2">Database</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-sqlite
                    </code>
                  </td>
                  <td className="py-3 px-2">Local database queries</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Fetch</td>
                  <td className="py-3 px-2">Web/API</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-fetch
                    </code>
                  </td>
                  <td className="py-3 px-2">Read web pages &amp; APIs</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Playwright</td>
                  <td className="py-3 px-2">Web/API</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @playwright/mcp@latest
                    </code>
                  </td>
                  <td className="py-3 px-2">Browser automation &amp; testing</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Brave Search</td>
                  <td className="py-3 px-2">Web/API</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-brave-search
                    </code>
                  </td>
                  <td className="py-3 px-2">Private web search</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Slack</td>
                  <td className="py-3 px-2">Productivity</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">
                      npx -y @modelcontextprotocol/server-slack
                    </code>
                  </td>
                  <td className="py-3 px-2">Team communication</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 px-2 font-semibold">Linear</td>
                  <td className="py-3 px-2">Productivity</td>
                  <td className="py-3 px-2">
                    <code className="text-xs">npx -y streamlinear</code>
                  </td>
                  <td className="py-3 px-2">Issue tracking &amp; project mgmt</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ── MEMORY / CONTEXT ─────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Memory &amp; Context Servers
          </h2>
          <p className="text-gray-300 mb-6">
            The most impactful category. Without memory servers, Claude Code
            starts every session from scratch&mdash;no knowledge of your
            decisions, preferences, or past work.
          </p>

          {/* memory-mcp */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            memory-mcp
          </h3>
          <p className="text-gray-300 mb-4">
            Persistent memory for AI agents. Stores learnings, identity
            patterns, preferences, and session state in a local SQLite database
            using FTS5 full-text search. Your agent remembers who it is, what
            it&apos;s learned, and what patterns it&apos;s observed&mdash;across
            every session.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add memory-mcp -- npx -y memory-mcp`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Agents that need to remember decisions,
              preferences, and identity across sessions. Especially powerful for
              long-running projects where context accumulates over weeks.
            </li>
            <li>
              <strong>How it works:</strong> Uses SQLite FTS5 instead of vector
              embeddings&mdash;zero dependencies, instant startup, and 46MB less
              bloat than embedding-based alternatives. Semantic search through
              text indexing, not heavyweight ML models.
            </li>
            <li>
              <strong>Limitations:</strong> Local-only storage by default (no
              cloud sync between machines). Text-based search, not vector
              similarity&mdash;great for structured knowledge, less suited for
              fuzzy semantic queries across thousands of documents.
            </li>
          </ul>

          {/* Context7 */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Context7
          </h3>
          <p className="text-gray-300 mb-4">
            Fetches up-to-date documentation and code examples for any
            programming library. Instead of relying on Claude&apos;s training
            data (which may be months old), Context7 pulls the latest docs
            directly from source.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add context7 -- npx -y @upstash/context7-mcp`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Working with libraries that update
              frequently. When you need accurate API signatures, not
              hallucinated ones. Especially valuable for Next.js, React, and
              fast-moving frameworks.
            </li>
            <li>
              <strong>How it works:</strong> Resolves a library name to a
              Context7-compatible ID, then queries a curated index of
              documentation and code snippets. Results include reputation scores
              and snippet counts.
            </li>
            <li>
              <strong>Limitations:</strong> Coverage depends on what&apos;s been
              indexed. Niche or very new libraries may not be available. Adds
              latency to queries since it fetches externally.
            </li>
          </ul>

          {/* Sequential Thinking */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Sequential Thinking
          </h3>
          <p className="text-gray-300 mb-4">
            An official MCP reference server that gives Claude a structured
            thinking tool. It can break complex problems into sequential steps,
            revise earlier thoughts, and branch into alternative approaches.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add thinking -- npx -y @modelcontextprotocol/server-sequential-thinking`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Complex debugging, architecture
              decisions, and multi-step reasoning where you want Claude to show
              its work explicitly.
            </li>
            <li>
              <strong>Limitations:</strong> Less useful with Opus extended
              thinking already enabled, since Opus does this natively. Most
              valuable on Sonnet or Haiku where built-in reasoning is shallower.
            </li>
          </ul>

          {/* ── DEVELOPMENT TOOLS ────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Development Tool Servers
          </h2>
          <p className="text-gray-300 mb-6">
            Connect Claude to your development infrastructure. These servers
            let Claude manage repos, track issues, and operate on files
            directly.
          </p>

          {/* GitHub */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            GitHub MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Full GitHub integration&mdash;create and review PRs, manage issues,
            search repositories, read file contents, and handle branches.
            Claude can interact with your GitHub repos as naturally as you do.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add github -- npx -y @modelcontextprotocol/server-github

# Requires GITHUB_TOKEN environment variable
export GITHUB_TOKEN=ghp_your_token_here`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Managing PRs and issues from within
              Claude sessions. Code review workflows where Claude reads the PR
              diff, checks related issues, and posts review comments.
            </li>
            <li>
              <strong>Limitations:</strong> Requires a personal access token
              with appropriate scopes. Claude Code already has{" "}
              <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
                gh
              </code>{" "}
              CLI access built in, so this server is most valuable for
              structured workflows rather than simple git operations.
            </li>
          </ul>

          {/* Filesystem */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Filesystem MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Secure file operations with configurable directory access. Read,
            write, search, and manage files and directories with granular
            permission controls.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Giving Claude access to directories
              outside the current project. Useful for monorepos, shared config
              directories, or when you need Claude to read reference files
              elsewhere on disk.
            </li>
            <li>
              <strong>Limitations:</strong> Claude Code already has native file
              access within the working directory. This server is mainly useful
              for explicitly granting access to additional paths with clear
              boundaries.
            </li>
          </ul>

          {/* Git */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Git MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Provides git operations through MCP&mdash;clone repos, view diffs,
            manage branches, read commit history. An official reference server
            from the MCP project.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add git -- npx -y @modelcontextprotocol/server-git`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Environments where you want structured
              git access rather than raw shell commands.
            </li>
            <li>
              <strong>Limitations:</strong> Claude Code already runs git commands
              natively through its shell. This server adds value mainly in
              restricted environments where direct shell access is limited.
            </li>
          </ul>

          {/* ── DATABASE ─────────────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Database Servers
          </h2>
          <p className="text-gray-300 mb-6">
            Let Claude query and analyze your data directly. Powerful for
            debugging, data analysis, and understanding production state.
          </p>

          {/* PostgreSQL */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            PostgreSQL MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Connect Claude to PostgreSQL databases. Run queries, inspect
            schemas, and analyze data through natural language. Supports
            connection pooling for production use.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add postgres -- npx -y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost/dbname`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Debugging data issues, exploring
              schemas, writing and testing queries, and data analysis tasks.
              &ldquo;Show me all users who signed up in the last week with
              failed payments&rdquo; just works.
            </li>
            <li>
              <strong>Limitations:</strong> Be careful with production
              databases&mdash;Claude can run any query the connection string
              allows. Use a read-only connection string or a read replica for
              safety. No built-in query approval workflow.
            </li>
          </ul>

          {/* SQLite */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            SQLite MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Query and manage SQLite databases. Lightweight, zero-config, and
            perfect for local development databases, analytics files, or any{" "}
            <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
              .db
            </code>{" "}
            file on disk.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add sqlite -- npx -y @modelcontextprotocol/server-sqlite /path/to/database.db`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Local development databases, analyzing
              exported data, working with embedded databases, and prototyping
              data models.
            </li>
            <li>
              <strong>Limitations:</strong> SQLite only&mdash;if your production
              database is Postgres or MySQL, this won&apos;t help with
              production debugging. No connection pooling (not needed for
              SQLite&apos;s single-file model).
            </li>
          </ul>

          {/* ── WEB / API ────────────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Web &amp; API Servers
          </h2>
          <p className="text-gray-300 mb-6">
            Give Claude the ability to read web pages, call APIs, automate
            browsers, and search the internet.
          </p>

          {/* Fetch */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Fetch MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Fetches content from URLs and converts HTML to markdown for Claude
            to process. Simple but essential&mdash;lets Claude read
            documentation, API responses, and web content.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add fetch -- npx -y @modelcontextprotocol/server-fetch`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Reading API documentation, checking
              deploy status pages, fetching JSON from REST endpoints, and
              pulling content from public web pages.
            </li>
            <li>
              <strong>Limitations:</strong> No JavaScript rendering&mdash;if the
              page requires JS to load content, you&apos;ll get an empty or
              partial result. Use Playwright for dynamic pages. No
              authentication support for private resources.
            </li>
          </ul>

          {/* Playwright */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Playwright MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Full browser automation through MCP. Control a real browser, take
            screenshots, fill forms, click buttons, and extract data from
            JavaScript-rendered pages.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add playwright -- npx -y @playwright/mcp@latest`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> E2E testing, scraping dynamic content,
              debugging frontend issues visually, and any task that requires
              interacting with a real browser.
            </li>
            <li>
              <strong>Limitations:</strong> Heavier than Fetch&mdash;launches a
              full browser instance. Slower startup and higher resource usage.
              Requires Playwright browsers to be installed ({" "}
              <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
                npx playwright install
              </code>
              ).
            </li>
          </ul>

          {/* Brave Search */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Brave Search MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Privacy-first web search. Claude can search the web for current
            information, research topics, and find documentation without
            tracking.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add brave-search -- npx -y @modelcontextprotocol/server-brave-search

# Requires BRAVE_API_KEY environment variable
export BRAVE_API_KEY=your_key_here`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Research tasks, finding current
              information, checking if a bug has been reported, finding package
              versions and compatibility info.
            </li>
            <li>
              <strong>Limitations:</strong> Requires a Brave Search API key
              (free tier available with rate limits). Search results
              aren&apos;t always as comprehensive as Google for niche technical
              queries.
            </li>
          </ul>

          {/* ── PRODUCTIVITY ─────────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Productivity Servers
          </h2>
          <p className="text-gray-300 mb-6">
            Connect Claude to your team&apos;s communication and project
            management tools. Let your coding agent understand the broader
            context of what the team is working on.
          </p>

          {/* Slack */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Slack MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Read and send Slack messages, search channels, summarize threads,
            and manage notifications. Claude can pull context from team
            conversations and post updates.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add slack -- npx -y @modelcontextprotocol/server-slack

# Requires SLACK_BOT_TOKEN and SLACK_TEAM_ID
export SLACK_BOT_TOKEN=xoxb-your-token
export SLACK_TEAM_ID=T0123456789`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Pulling context from team discussions
              into coding sessions. &ldquo;What did the team decide about the
              auth migration in #engineering?&rdquo; Getting answers without
              tab-switching.
            </li>
            <li>
              <strong>Limitations:</strong> Requires a Slack app with bot
              permissions configured for your workspace. Message posting
              capabilities mean you should be careful&mdash;Claude could send
              messages to channels if instructed. Set appropriate permission
              scopes.
            </li>
          </ul>

          {/* Linear */}
          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            Linear MCP Server
          </h3>
          <p className="text-gray-300 mb-4">
            Manage Linear issues directly from Claude. Search, create, update
            issues, add comments, and query project status. Keeps your coding
            flow connected to project management.
          </p>
          <pre className="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto text-sm mb-4">
            <code className="text-gray-300">{`claude mcp add linear -- npx -y streamlinear

# Requires LINEAR_API_KEY environment variable
export LINEAR_API_KEY=lin_api_your_key_here`}</code>
          </pre>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Best for:</strong> Linking code changes to issue
              tracking. Claude can read the issue description, implement the
              feature, and update the issue status&mdash;all in one flow.
            </li>
            <li>
              <strong>Limitations:</strong> Linear-specific&mdash;doesn&apos;t
              work with Jira, Asana, or other project management tools. Requires
              API key with appropriate permissions.
            </li>
          </ul>

          {/* ── OUR PICKS ────────────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Our Picks: The Essential Stack
          </h2>
          <p className="text-gray-300 mb-4">
            You don&apos;t need every MCP server. Most developers get the
            biggest impact from a focused set. Here&apos;s what we recommend
            based on how you work:
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            The Solo Developer Stack
          </h3>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong className="text-forge-cyan">memory-mcp</strong> &mdash;
              Your agent remembers your decisions, coding style, and project
              context across sessions. This is the single highest-impact server.
            </li>
            <li>
              <strong>Context7</strong> &mdash; Never get outdated API docs
              again. Essential for fast-moving frameworks.
            </li>
            <li>
              <strong>Fetch</strong> &mdash; Read documentation and API
              responses. Lightweight, zero-config.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            The Team Developer Stack
          </h3>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              Everything in the Solo stack, plus:
            </li>
            <li>
              <strong>GitHub</strong> &mdash; PR reviews, issue triage, and
              repo management without leaving Claude.
            </li>
            <li>
              <strong>Linear</strong> (or your issue tracker) &mdash; Connect
              code to tickets.
            </li>
            <li>
              <strong>Slack</strong> &mdash; Pull team context into coding
              sessions.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-3 text-white">
            The Full Stack Developer Stack
          </h3>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              Everything in the Team stack, plus:
            </li>
            <li>
              <strong>PostgreSQL</strong> &mdash; Debug data issues and explore
              schemas in natural language. Use a read-only connection.
            </li>
            <li>
              <strong>Playwright</strong> &mdash; Visual debugging and E2E
              testing through Claude.
            </li>
            <li>
              <strong>Brave Search</strong> &mdash; Research current solutions,
              check package compatibility, find docs.
            </li>
          </ul>

          {/* ── TIPS ─────────────────────────────────────────── */}
          <h2 className="text-2xl font-bold mt-10 mb-4 text-forge-cyan">
            Tips for Managing MCP Servers
          </h2>
          <ul className="list-disc pl-6 text-gray-300 mb-4 space-y-2">
            <li>
              <strong>Enable Tool Search.</strong> With many servers installed,
              Claude Code&apos;s MCP Tool Search lazy-loads tools on demand.
              This keeps your context window clean&mdash;Claude only loads the
              tools it needs for the current task.
            </li>
            <li>
              <strong>Use project-level settings for project-specific servers.</strong>
              {" "}Database connections and project management servers should go in{" "}
              <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
                .claude/settings.json
              </code>
              . Global utilities like memory and search go in{" "}
              <code className="text-forge-cyan bg-white/5 px-1.5 py-0.5 rounded text-sm">
                ~/.claude/settings.json
              </code>
              .
            </li>
            <li>
              <strong>Read-only database connections.</strong> Always use
              read-only credentials for production databases. Claude can and
              will run whatever queries the connection allows.
            </li>
            <li>
              <strong>Check the MCP Registry.</strong> The official{" "}
              <a
                href="https://registry.modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-forge-cyan hover:underline"
              >
                MCP Registry
              </a>{" "}
              catalogs publicly available servers. New servers ship regularly.
            </li>
            <li>
              <strong>Don&apos;t over-install.</strong> Each server adds tools
              to Claude&apos;s context. Start with the essentials and add more
              only when you have a specific need. More servers doesn&apos;t
              always mean more capable.
            </li>
          </ul>

          {/* ── CTA ──────────────────────────────────────────── */}
          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xl font-bold mb-3">
              Your Agent Deserves to Remember
            </h3>
            <p className="text-gray-400 mb-4">
              MCP servers give Claude Code new capabilities, but memory is
              foundational. Without it, every session starts from zero&mdash;no
              knowledge of your architecture, your decisions, or your coding
              style. Substratia&apos;s memory tools fix that.{" "}
              <strong>memory-mcp</strong> gives your agent persistent memory
              that survives every restart.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/memory-tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-forge-cyan/20 text-forge-cyan border border-forge-cyan/30 rounded-lg hover:bg-forge-cyan/30 transition-colors font-semibold"
              >
                Explore Memory Tools
              </Link>
              <a
                href="https://github.com/WhenMoon-afk/claude-memory-mcp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 text-gray-300 border border-white/10 rounded-lg hover:bg-white/10 transition-colors font-semibold"
              >
                memory-mcp on GitHub
              </a>
            </div>
          </div>
        </div>

        <BlogAuthor />

        <RelatedPosts
          posts={[
            {
              href: "/blog/memory-mcp-vs-alternatives",
              title: "Best MCP Memory Servers Compared",
              description:
                "Compare the top MCP memory servers for Claude and AI assistants",
            },
            {
              href: "/blog/context-management-guide",
              title: "The Ultimate Guide to Claude Code Context Management",
              description:
                "Master context windows and maximize your AI coding sessions",
            },
          ]}
        />
      </article>
    </main>
  );
}
