# Integration Guide - Developer Agent System

This guide explains how to integrate the agent configurations into your development workflow.

## Quick Start

### Option 1: Single Agent (Recommended Start)

1. Choose the agent that matches your immediate need
2. Copy the `.md` file to your project root
3. Rename to `CLAUDE.md`
4. Customize the `[PLACEHOLDERS]` for your project
5. Start using with Claude Code

```bash
# Example
cp code-review-agent.md ~/my-project/CLAUDE.md
```

### Option 2: Combined Configuration

Merge multiple agents into a single CLAUDE.md:

```markdown
# CLAUDE.md

## Project Context
[Your project info - shared across all agents]

## Mode: Code Review
[Contents from code-review-agent.md]

## Mode: Testing
[Contents from testing-agent.md]

## Mode: Documentation
[Contents from documentation-agent.md]
```

### Option 3: Agent Switching

Create multiple config files and switch as needed:

```
.claude/
├── CLAUDE.md           # Current active config
├── review.md           # Code review mode
├── test.md             # Testing mode
└── docs.md             # Documentation mode
```

Switch with: `cp .claude/review.md CLAUDE.md`

## Tool Compatibility

### Claude Code
- File: `CLAUDE.md` in project root
- Automatic loading on session start
- Full feature support

### Cursor
- File: `AGENTS.md` in project root
- Rename your config to AGENTS.md
- Same format, different filename

### Other AI Tools
Most AI coding assistants support similar project-level configuration. Check your tool's documentation for the expected filename.

## Customization Deep Dive

### Project Context Section

Every agent has a Project Context block. Fill this out accurately:

```markdown
## Project Context

Tech Stack: TypeScript, React 18, Node.js 20
Framework: Next.js 14 (App Router)
Package Manager: pnpm
Test Framework: Vitest
Database: PostgreSQL with Prisma
```

### Adding Project-Specific Rules

Add custom rules that apply to your codebase:

```markdown
## Project-Specific Rules

- All API routes must use the `withAuth` middleware
- Database queries must go through the repository layer
- React components must be functional with hooks
- All dates must use `date-fns` library
- Error messages must be user-friendly (no stack traces)
```

### Excluding Files/Directories

Tell the agent what to ignore:

```markdown
## Ignore

- `node_modules/`
- `dist/`
- `*.generated.ts`
- `.next/`
- `coverage/`
```

## Workflow Integration

### Pre-Commit Reviews

Use the code review agent before commits:

1. Stage your changes: `git add .`
2. Ask Claude to review staged changes
3. Address any critical/high issues
4. Commit

### Documentation Updates

Trigger documentation agent when:

- Adding new public functions/APIs
- Changing existing behavior
- Adding new endpoints

### Test Writing

Use testing agent after implementing features:

1. Implement the feature
2. Ask Claude to suggest test cases
3. Write tests based on suggestions
4. Verify coverage

### Security Audits

Run security agent periodically:

- Before major releases
- After adding authentication changes
- When adding new dependencies
- Quarterly for ongoing maintenance

## Team Usage

### Shared Configuration

Commit your CLAUDE.md to version control so the team shares the same agent behavior.

### Environment-Specific Configs

For different environments:

```
.claude/
├── CLAUDE.md           # Development
├── CLAUDE.prod.md      # Production review mode
└── CLAUDE.ci.md        # CI/CD mode
```

### Onboarding

New team members can immediately benefit from the agent configurations - they encode your team's standards.

## Troubleshooting

### Agent Not Following Rules

1. Check that CLAUDE.md is in the correct location
2. Verify no syntax errors in the markdown
3. Restart the Claude Code session
4. Make rules more explicit if needed

### Conflicting Instructions

If you've combined agents and they conflict:

1. Prioritize one set of rules
2. Use conditional sections
3. Split into separate configs

### Performance Issues

If the agent is slow:

1. Keep CLAUDE.md concise (under 500 lines)
2. Use separate config files for different tasks
3. Remove redundant instructions

## Best Practices

1. **Start minimal** - Add rules as needed, not preemptively
2. **Be specific** - Vague rules lead to inconsistent behavior
3. **Test changes** - Verify config changes work as expected
4. **Document why** - Explain reasoning in comments
5. **Review regularly** - Update configs as your project evolves

---

## Support

Email: support@substratia.io

For Enterprise bundle customers: Access the private Discord for direct support.

---

Part of the Substratia ecosystem.
