# Contributing to Reusables

Thank you for your interest in contributing to Reusables! This guide will help you understand our development process and how you can contribute effectively.

## Project Structure

The project is organized into several key directories:

- `registry/`: Contains the core reusable components, hooks, and utilities
  - `default/reusables/`: Main reusable components
  - `default/hooks/`: Reusable React hooks
  - `default/lib/`: Utility functions
  - `default/example/`: Example implementations
- `content/docs/`: Documentation for all components and features

## Development Workflow

### 1. Understanding Reusables

Before contributing, familiarize yourself with existing reusables and their documentation. Each reusable typically consists of:

- Core component(s) in the registry
- Example implementation
- Documentation

Review existing components like the `split-button` (a UI component with variants and comprehensive documentation) to understand the project's patterns and standards.

### 2. Creating a New Reusable

1. **Plan Your Component**

   - Ensure it's reusable across different projects
   - Consider common use cases and customization options

2. **Implementation**

   - Create your component in the appropriate directory:
     - UI components: `registry/reusables/ui/`
     - React hooks: `registry/hooks/`
     - Utility functions: `registry/lib/`
   - Register your component in the corresponding registry file:
     - Components: `registry/registry-components.ts`
     - UI components: `registry/registry-ui.ts`
     - Hooks: `registry/registry-hooks.ts`
     - Utilities: `registry/registry-lib.ts`
   - Add necessary types and interfaces
   - Implement the core functionality
   - Add proper comments and TypeScript documentation

3. **Create Examples**

   - Add example implementation in `registry/example/`
   - Demonstrate different use cases and variations
   - Register your example in `registry/registry-examples.ts`

4. **Testing and Building**
   - Run `bun run build` or `bun run build:registry` to build your reusable components and examples
     - This step is crucial before documentation as it registers components in index.tsx
     - Skipping this step may cause "component not found" errors in documentation
   - Test your component across different scenarios
   - Ensure proper error handling
   - Verify accessibility standards

### 3. Documentation

We use [FumaDocs](https://fumadocs.vercel.app/) for documentation. Familiarize yourself with [FumaDocs UI components](https://fumadocs.vercel.app/docs/ui/components) before starting. Follow these steps:

1. **Create Documentation File**

   - Add a new MDX file in `content/docs/`
   - Follow the existing documentation structure

2. **Documentation Structure**

```js
---
title: Component Name
description: Brief description ofthe component
---

## Overview

[Component description and use cases]

## Installation

<Tabs items={["CLI", "Manual"]}>
<Tab value="CLI">
`package-install
       npx shadcn@latest add "https://reusables.vercel.app/r/component-name"
       `
</Tab>
<Tab value="Manual">
`json doc-gen:file
{
    "file": "registry/reusables/component-name.tsx",
    "codeblock": {
    "lang": "tsx",
    "meta": "title=\"component-name.tsx\""
     }
    }
       `
</Tab>
</Tabs>

## Usage

[Basic usage example]

## Examples

[Different implementation examples]

## API Reference

[Component props and methods]
```

3. **Include Examples**

- Use the `<ComponentSource>` component to reference and display component examples
- Show dfferenaiations ase cases
- Prov, cpy-pa-table c nippets

tting Your Cotribution

1. **Fork & Branch**

- Fork the repository
- Create a feature branch: feature/componame`

2. \*\*Comit Guidelines-clecommiess|ages

- Keep o focusedatomi|

3. **Pull Reuest**

- Submit a PR with a clear description
- Reference any related isues
- Ensure all checks pass

## Best Practices

1. **Component Design**

- Keep components focused and single-purpose
- Use TypeScript for type safety
- Follow React best practices
- Ensure accessibility (ARIA attributes, keyboard navigation)

2. **Code Style**

- Follow the project's ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

3. **Documentation**

- Write clear, concise documentation
- Include practical examples
- Document all props and configuration options
- Explain any complex concepts or edge cases

## Need Help?

If you need help or have questions:

1. Check existing documentation and examples
2. Look through similar components
3. Open an issue for discussion

## Review Process

Your contribution will be reviewed for:

1. Code quality and style
2. Documentation completeness
3. Component reusability
4. Performance and accessibility

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.

Thank you for contributing to Reusables! Your efforts help make this project better for everyone.
