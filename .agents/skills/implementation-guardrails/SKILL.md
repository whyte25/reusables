---
name: implementation-guardrails
description: Enforces Emora repo standards for clean implementation across components, hooks, API routes, server actions, and module boundaries. Use when starting implementation or refactoring in this repo to avoid shallow abstractions, util-folder dumping, unnecessary effects, feature leakage, dead paths, and poor file structure.
---

# Implementation Guardrails

Use this skill when implementation is about to start in the Emora repo.

## Quick start

Before writing code:

- Identify the real ownership boundary
- Choose the right module shape for that boundary
- Keep product logic out of generic primitives
- Keep renderers rendering and coordinators coordinating
- Prefer deep modules over helper sprawl

Then use:

- [REFERENCE.md](REFERENCE.md) for boundary and file-placement rules
- [CHECKLIST.md](CHECKLIST.md) before you commit or declare work done

## Core rules

1. Do not spread implementation across random files just to make files smaller.
2. Do not leave orchestration in UI components if it can live behind a hook, action, service, or state boundary.
3. Do not dump domain logic into `utils` when it deserves a named module with tests.
4. Do not let reusable components learn feature-specific knowledge.
5. Do not keep dead, duplicated, deprecated, or compatibility paths “for later” if the current slice proves the new path.
6. Do not add `useEffect` for derived state, event responses, or control flow when render logic or event handlers can do it.
7. Do not use server actions, route handlers, or service helpers as thin pass-through clutter. Give them real boundaries.
8. Do not preserve misleading names after architecture changes.
9. Prefer one honest module over several shallow wrappers.
10. If a change passes tests but leaves a known smell in the active slice, call it out and either fix it or explicitly defer it.

## Implementation workflow

1. Find the real seam: ownership, orchestration, rendering, persistence, or transport.
2. Choose the right boundary shape: component, hook, state provider, action, service, pure module, or route.
3. Keep the first slice behavior-preserving unless the task is explicitly behavioral.
4. Remove the old path once the new one is proven in the same slice when practical.
5. Verify through behavior-level checks, not implementation-coupled tests.

## Pair with

- `react-useeffect` for effect decisions
- `vercel-composition-patterns` for component and state composition
- `vercel-react-best-practices` for React/Next.js performance and rendering decisions
- `tdd` when implementing behavior through tracer-bullet slices
