# Security Policy

## Supported Versions

The following versions of **Mahi UI Component Playground** are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security and integrity of Mahi UI Component Playground seriously. If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public GitHub issue** describing the vulnerability.
2. Email the maintainer team or report privately via GitHub Security Advisories.
3. Include detailed steps to reproduce the issue, proof of concept, and affected components.
4. We will acknowledge receipt within 48 hours and provide a remediation plan.

## Code Execution Safety & Sandboxing

Mahi UI Component Playground runs entirely client-side with a strict zero-eval execution sandbox:
- Previews render statically defined, safe HTML/CSS/JS templates without runtime `eval()` or unconstrained DOM injections.
- External URLs are strictly sanitized (`https://` validation) and rendered with `rel="noopener noreferrer"`.
- WebGL contexts in the Three.js 3D Lab are isolated and clean up GPU resources upon modal dismissal.
