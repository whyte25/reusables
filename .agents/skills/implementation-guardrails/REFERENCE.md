# Reference

## What Good Looks Like

Implementation in this repo should feel:

- honest about ownership
- modular without being fragmented
- composable without prop soup
- specific about product boundaries
- small in public surface, deep in hidden complexity

The target is not “many files.” The target is clear responsibility.

## Boundary Rules

### 1. UI components

UI components should primarily:

- render
- translate user interaction into explicit callbacks
- compose smaller UI pieces

UI components should not primarily:

- coordinate multi-step product workflows
- own server or checkout orchestration
- contain large blocks of business rules
- hide a state machine in JSX branches

If a component becomes orchestration-heavy, extract:

- a hook for UI state coordination
- a pure behavior module for rules
- a service/action boundary for async workflow

### 2. Hooks

Hooks are good for:

- view-model coordination
- browser integration
- syncing with external systems
- exposing one focused interface to UI

Hooks are bad when they become:

- bags of unrelated actions
- UI timing engines for multiple components
- wrappers around wrappers with no deeper ownership

A hook should have a crisp reason to exist.

### 3. Pure modules

Use a pure module when logic is:

- deterministic
- reused across surfaces
- domain-oriented
- worth testing directly

Good examples:

- decision helpers
- summary builders
- validation rules
- checkout-context builders
- visibility/scheduling rules

Bad examples:

- one-line “helpers” created only to move code out of a component
- generic `utils` blobs with unrelated logic mixed together

## File Placement Rules

### Put logic near the domain, not in `utils` by default

If logic belongs to a feature concept, place it with that feature:

- scheduling logic near publish/editor scheduling
- AI handoff logic near AI/chat behavior
- page summary logic near AI context building

Do not put domain logic in a generic util folder unless it is truly shared and domain-agnostic.

### Use `lib` for focused pure logic

Use a feature `lib` module when:

- the logic is pure
- the interface is stable
- the module deepens a boundary

Do not use `lib` as a nicer name for dumping helpers.

### Use `services` and `actions` honestly

Use a service when it:

- owns a workflow
- coordinates multiple subsystems
- provides a stable business boundary

Use an action when it:

- is the real server mutation boundary
- encapsulates a concrete remote workflow

Do not create pass-through services or actions that just rename another call.

## API Routes and Server Actions

### Route handlers

Routes should:

- parse and validate input
- authenticate/authorize
- hand off to a real service boundary
- return a clear response contract

Routes should not:

- contain the entire product workflow inline
- duplicate business rules already owned elsewhere

### Server actions

Server actions should:

- represent a meaningful mutation or workflow boundary
- encapsulate remote side effects cleanly
- return a contract the caller can act on

Server actions should not:

- become hidden API routes with random business logic
- leak provider-specific details into unrelated UI code

## Component Composition Rules

### Reusable primitives must stay ignorant

A reusable component should not know:

- which feature it is inside
- which wizard or workflow owns it
- product-specific context names

If feature-specific wiring is needed:

- build a feature wrapper
- inject behavior through props or provider interfaces
- keep the primitive generic

### Prefer explicit variants over boolean mode growth

When two variants differ meaningfully:

- split them into explicit wrappers/components

Do not pile on booleans like:

- `isMobile`
- `isEditor`
- `isWizard`
- `isGenerateMode`

when the result is really several distinct surfaces.

## Effect Rules

Before using `useEffect`, ask:

1. Is this external synchronization?
2. Is this browser/event/subscription integration?
3. Is this analytics because something appeared on screen?

If not, it probably should not be an effect.

Common smells:

- deriving state from props/state in an effect
- reacting to user actions in an effect instead of the event handler
- setting flags after render that could be calculated during render
- chaining state updates through effects

## Smell List

If you see these, stop and reconsider:

- feature-specific knowledge inside a shared primitive
- callback tunneling through several layers
- pass-through services/actions/hooks
- dead compatibility wrappers after the migration is already done
- stale naming that lies about architecture
- static suggestions where product context should drive behavior
- route components rendering whole UI states inline
- giant components that know every concern on the screen
- duplicated workflow logic in several components
- a “util” function that is actually business logic

## Cleanup Standard

When a slice lands, ask:

- Did we remove the old path?
- Did we remove stale names?
- Did we remove dead exports?
- Did we reduce the number of lies in the architecture?

If not, the slice may be incomplete.
