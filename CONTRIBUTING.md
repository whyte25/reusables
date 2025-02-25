# Contributing to Reusables

Thank you for your interest in contributing to Reusables! This guide will help you understand our development process and how you can contribute effectively.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Development Workflow](#development-workflow)
   - [Understanding Reusables](#1-understanding-reusables)
   - [Creating a New Reusable](#2-creating-a-new-reusable)
   - [Documentation](#3-documentation)
3. [Submitting Your Contribution](#submitting-your-contribution)
4. [Best Practices](#best-practices)
5. [Need Help?](#need-help)
6. [Review Process](#review-process)
7. [License](#license)

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

Before contributing:

- Familiarize yourself with existing reusables and their documentation.
- Review components like the `split-button` to understand project patterns and standards.
- Each reusable typically consists of:
  - Core component(s) in the registry
  - Example implementation
  - Documentation

### 2. Creating a New Reusable

#### a. Plan Your Component

- Ensure it's reusable across different projects
- Consider common use cases and customization options

#### b. Implementation

1. Create your component in the appropriate directory:
   - UI components: `registry/reusables/ui/`
   - React hooks: `registry/hooks/`
   - Utility functions: `registry/lib/`
2. Add necessary types and interfaces
3. Implement the core functionality
4. Register your component in the registry.json file
5. Add proper comments and TypeScript documentation

#### c. Create Examples

- Add example implementation in `registry/example/`
- Demonstrate different use cases and variations

#### d. Testing and Building

- Run `bun run build` or `bun run build:registry`
  - This step is crucial before documentation
  - Skipping may cause "component not found" errors
- Test your component across different scenarios
- Ensure proper error handling
- Verify accessibility standards

### 3. Documentation

We use [FumaDocs](https://fumadocs.vercel.app/) for documentation. Familiarize yourself with [FumaDocs UI components](https://fumadocs.vercel.app/docs/ui/components) before starting.

#### a. Create Documentation File

- Add a new MDX file in `content/docs/`
- Follow the existing documentation structure

#### b. Documentation Structure

```markdown
---
title: Component Name
description: Brief description of the component
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

#### c. Include Examples

- Use the `<ComponentSource>` component to reference and display component examples
- Show different use cases
- Provide copy-pastable code snippets

## Submitting Your Contribution

1. **Fork & Branch**

   - Fork the repository
   - Create a feature branch: `feature/component-name`

2. **Commit Guidelines**

   - Write clear, concise commit messages
   - Keep commits focused and atomic

3. **Pull Request**
   - Submit a PR with a clear description
   - Reference any related issues
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

If you need assistance or have questions:

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
