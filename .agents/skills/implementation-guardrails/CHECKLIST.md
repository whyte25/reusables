# Checklist

## Before Implementation

- [ ] What is the real ownership boundary here?
- [ ] Is this a UI problem, a workflow problem, a domain logic problem, or a transport problem?
- [ ] Should this live in a component, hook, pure module, service, action, or route?
- [ ] Am I about to create a shallow wrapper instead of a deeper module?
- [ ] Am I about to put domain logic into a generic util location?
- [ ] Am I about to teach a reusable component feature-specific behavior?
- [ ] Am I about to use `useEffect` for something that should be render-time or event-driven?

## During Implementation

- [ ] Keep renderers rendering and coordinators coordinating
- [ ] Keep server and checkout workflows out of UI where possible
- [ ] Keep names honest to the architecture
- [ ] Prefer one clear boundary over several tiny pass-through files
- [ ] Remove duplicated rules once the new source of truth exists

## Before Commit

- [ ] Did this change reduce a real smell, not just move code around?
- [ ] Did I leave dead code, deprecated exports, or duplicate paths behind?
- [ ] Did I leave a misleading name after changing the architecture?
- [ ] Are tests checking behavior rather than implementation details?
- [ ] If something still smells in the active slice, did I fix it or explicitly call it out?

## Before Declaring Done

- [ ] The public boundary is simpler than before
- [ ] The implementation is deeper than before
- [ ] The product logic lives in the right layer
- [ ] The file placement matches domain ownership
- [ ] There is no obvious “bad actor” left behind in the touched area
