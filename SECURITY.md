# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities
2. Email security concerns to the repository owner via GitHub
3. Or use GitHub's private vulnerability reporting feature

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Target**: Within 30 days for critical issues

## Security Measures

### Authentication & Authorization
- Clerk handles all user authentication with industry-standard security
- API keys are SHA-256 hashed before storage
- All mutations require authenticated sessions
- User data is scoped and isolated

### Data Protection
- HTTPS enforced on all endpoints
- Strict Content Security Policy
- HttpOnly, Secure, SameSite cookies
- No sensitive data in logs or error messages

### Infrastructure
- Vercel edge network with DDoS protection
- Convex serverless with automatic scaling
- Cloudflare DNS with proxy protection

### Code Security
- Pre-commit hooks prevent secret commits
- Dependabot monitors for vulnerable dependencies
- CodeQL scans for code vulnerabilities
- TruffleHog scans for leaked secrets

## Security Headers

All responses include:
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Strict-Transport-Security`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve our security.
