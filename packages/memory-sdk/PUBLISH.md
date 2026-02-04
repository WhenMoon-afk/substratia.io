# Publishing @substratia/memory

## Prerequisites

1. **npm account** - Create at npmjs.com if needed
2. **@substratia org** - Create at npmjs.com/org/create
3. **npm login** - Run `npm login` and authenticate

## Pre-publish Checklist

- [ ] Version bump in package.json (if not first publish)
- [ ] Build passes: `npm run build`
- [ ] README is up to date
- [ ] API key tested end-to-end
- [ ] CHANGELOG updated (if applicable)

## First-time Setup

### 1. Create npm Organization

Go to: https://www.npmjs.com/org/create

- Organization name: `substratia`
- Type: Public (free)

### 2. Login to npm

```bash
npm login
# Follow prompts to authenticate
```

### 3. Verify Access

```bash
npm whoami
# Should show your npm username
```

## Publishing

### Test Run (Dry Run)

```bash
npm publish --dry-run
```

This shows what would be published without actually doing it.

### Publish

```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages on the free npm tier.

## After Publishing

1. Verify package is live:

   ```bash
   npm view @substratia/memory
   ```

2. Test installation in a new project:

   ```bash
   mkdir test-sdk && cd test-sdk
   npm init -y
   npm install @substratia/memory
   ```

3. Update website docs with the new package name

## Version Bumping

For subsequent releases:

```bash
# Patch (0.1.0 -> 0.1.1)
npm version patch

# Minor (0.1.0 -> 0.2.0)
npm version minor

# Major (0.1.0 -> 1.0.0)
npm version major
```

Then publish:

```bash
npm publish --access public
```

## Troubleshooting

### "You must sign up for private packages"

You need the `--access public` flag for scoped packages on free npm.

### "Organization does not exist"

Create the org first: https://www.npmjs.com/org/create

### "You do not have permission"

Make sure you're a member of the @substratia org with publish rights.

## Links

- npm package: https://www.npmjs.com/package/@substratia/memory
- Organization: https://www.npmjs.com/org/substratia
- Source: https://github.com/substratia/memory
