<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# AGENTS.md - AI Companion Development Guidelines

## 🎯 Project Overview

This is an **AI Companion** web application built with:
- **Frontend**: Next.js 16 (App Router, React 19, Server Components)
- **Backend API**: Laravel 13 (REST API with Sanctum authentication)
- **AI Integration**: Custom agent workflows with prompt engineering

**Core Stack Constraints:**
- Next.js 16 has **breaking changes** from v15 - do not assume legacy APIs
- Authentication uses **HTTP-Only Cookies** (not localStorage/JWT)
- Laravel acts as the API gateway and AI orchestration layer

---

## 🚨 CRITICAL: Next.js 16 Breaking Changes

You MUST follow these patterns. The old ways will cause compilation errors.

### Async Dynamic APIs (MANDATORY)
```typescript
// ❌ OLD (v15) - Will fail in Next.js 16
export default function Page({ params, searchParams }) {
  const { id } = params;
  const { page } = searchParams;
}

// ✅ NEW (v16) - ALWAYS use await
export default async function Page({ params, searchParams }) {
  const { id } = await params;
  const { page } = await searchParams;
}
<!-- END:nextjs-agent-rules -->
