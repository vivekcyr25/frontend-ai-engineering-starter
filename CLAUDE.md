# AI Development Instructions

Instructions for AI coding assistants (Cursor, Claude, etc.) working in this repository.

## Project

This is a **frontend AI engineering starter repository**. It supports learning and practicing AI-assisted frontend development with a minimal, maintainable setup. Keep changes focused and avoid unnecessary complexity.

## Stack

- **HTML** — structure and semantics
- **CSS** — styling and layout
- **JavaScript** — behavior and interactivity
- **Node.js** — local tooling when needed (no framework required for the starter)
- **Git** — version control with Conventional Commits
- **Cursor AI** — AI-assisted development workflow

## Coding Conventions

- Prefer simple and readable code over clever abstractions.
- Use semantic HTML (`header`, `main`, `nav`, `section`, etc.).
- Use meaningful variable and function names.
- Keep files focused and maintainable; one concern per file when practical.
- Avoid unnecessary dependencies; justify any new package before adding it.
- Do not introduce breaking changes without explaining them in the commit message or PR description.
- Review all AI-generated code before committing — verify correctness, accessibility, and style consistency.

## Git Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages:

```text
feat: add new functionality
fix: fix a bug
docs: update documentation
chore: update project configuration
refactor: improve code structure
```

Scope is optional. Keep the subject line in imperative mood and under 72 characters when possible.

## AI Assistant Rules

- Read `README.md` and this file before making changes.
- Match existing project tone and structure.
- Do not add fake commands, dependencies, or claims in documentation.
- Do not commit secrets (API keys, passwords, `.env` files).
- Prefer small, logical commits over one large dump of changes.
- When editing documentation, improve clarity for new developers.
