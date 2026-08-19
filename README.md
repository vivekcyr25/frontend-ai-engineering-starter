# Frontend AI Engineering Starter

A minimal starter repository for **Week 1: Environment and AI Toolchain – Frontend AI Engineering**. It demonstrates a clean development environment, Git workflow, repository conventions, and AI-assisted development with Cursor.

## Purpose

This repository is a foundation for learning frontend development with AI tooling. It includes project documentation, ignore rules, licensing, and AI assistant guidelines — without unnecessary application code or dependencies.

Use it to:

- Practice Git and Conventional Commits
- Configure a professional repository layout
- Work with Cursor AI using documented conventions
- Build frontend features incrementally on a simple HTML/CSS/JS stack

## Technology Stack

| Tool | Role |
|------|------|
| HTML | Page structure and semantics |
| CSS | Styling and layout |
| JavaScript | Client-side behavior |
| Node.js | Local tooling (when needed) |
| Git | Version control |
| Cursor AI | AI-assisted development |

## Development Conventions

- Write semantic, accessible HTML.
- Keep CSS and JavaScript readable and maintainable.
- Use meaningful names for variables, functions, and files.
- Avoid unnecessary dependencies.
- Follow the rules in [`CLAUDE.md`](./CLAUDE.md) when using AI assistants.
- Review AI-generated changes before committing.

## Getting Started

### Prerequisites

Verify the following are installed on your machine:

```bash
git --version
node --version
```

This project was set up with Git 2.52+ and Node.js 22.x. Any recent LTS versions should work.

### Setup

1. Clone or open this repository locally.
2. Open the project folder in [Cursor](https://cursor.com/).
3. Read [`CLAUDE.md`](./CLAUDE.md) so AI assistants follow project conventions.
4. Add HTML, CSS, and JavaScript files as you build features — no build step is required for the starter.

To serve static files locally with Node.js (optional, after you add pages):

```bash
npx --yes serve .
```

Then open the URL shown in the terminal (typically `http://localhost:3000`).

## AI-Assisted Development

This project is designed for use with **Cursor AI**:

1. Open the repo in Cursor and reference `@CLAUDE.md` in prompts for stack and convention context.
2. Ask for small, reviewable changes rather than large rewrites.
3. Verify AI output against project rules before committing.
4. Use Conventional Commits for every change.

Example prompt:

> "Add a simple landing page using semantic HTML. Follow CLAUDE.md conventions."

## Git and Commit Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add new functionality
fix: fix a bug
docs: update documentation
chore: update project configuration
refactor: improve code structure
```

Example workflow:

```bash
git add .
git commit -m "docs: update readme getting started section"
```

## License

This project is licensed under the MIT License — see [LICENSE](./LICENSE).
