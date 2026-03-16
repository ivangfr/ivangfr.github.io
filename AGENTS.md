# AGENTS.md

Guidelines for agentic coding agents working in this repository.

## Project Overview

This is a **vanilla JavaScript static website** hosted on GitHub Pages at `ivangfr.github.io`. It is a single-page portfolio listing Ivan Franchin's GitHub Proof-of-Concept repositories and Medium articles. There is no build system, package manager, bundler, or transpilation step.

**Source files:**
- `index.html` — the single HTML page (~248 lines)
- `app.js` — all application logic and data (~1910 lines)

**Runtime dependencies (CDN only — no local installs):**
- Tailwind CSS (via `https://cdn.tailwindcss.com` — Play CDN, configured inline in `index.html`)

There is **no jQuery** and **no Semantic UI** in this project.

## Build / Lint / Test Commands

There is **no build step, no package manager, no linter, and no test suite** in this project.

**To preview the site locally**, open `index.html` directly in your browser — no build step or server required.

Alternatively, use any static file server for a more production-like environment:
```bash
python3 -m http.server 8080
# then open http://localhost:8080 in a browser
```

Or with Node.js (if available):
```bash
npx serve .
```

**Deployment** happens automatically: pushing to the `main` branch triggers GitHub Pages to serve the updated site. There is no CI/CD pipeline or GitHub Actions workflow.

## Architecture

The entire application lives in two files:

- **`index.html`** — declares the Tailwind CSS layout structure (navbar, tag filter panel, search input, project grid, empty state). Contains no inline JavaScript logic beyond the Tailwind config block.
- **`app.js`** — contains:
  1. State variables (`activeTags` Set, `textQuery` string).
  2. DOM reference constants (obtained with `document.getElementById`).
  3. Theme toggle logic (dark/light mode via `localStorage`).
  4. A `sourceConfig` object mapping `"github"` / `"medium"` to badge styles and SVG icons.
  5. Rendering functions: `buildTagPill`, `renderCards`, `renderTagList`, `getAllTags`.
  6. Event wiring for tag filter, tag search, text search, and clear button.
  7. A `projects` array holding every entry (~236 items, lines 255–1904).
  8. A `cachedTags` constant (computed once from `getAllTags()` after the `projects` array).
  9. Direct calls to `renderTagList()` and `renderCards()` at the bottom of the file.

There are no ES modules, no `import`/`export` statements, no `require()` calls, and no bundler. Everything runs in the browser global scope. `app.js` is loaded as a plain `<script src="app.js">` tag at the bottom of `<body>`.

## Adding a New Entry

The only routine change to this codebase is adding a new project or article to the `projects` array in `app.js`.

Each entry is a plain object literal with exactly these five keys:

```js
{
    name: "repository-or-article-name",
    url: "https://full-url-to-project-or-article",
    description: "A human-readable sentence describing what the project does.",
    tags: ["tag-one", "tag-two", "tag-three"],
    source: "github"   // or "medium"
}
```

**Rules for entries:**
- New entries go at the **end** of the `projects` array (before the closing `]`).
- `source` must be either `"github"` or `"medium"` — these values are keys into `sourceConfig` and control the badge style and icon rendered on each card.
- `tags` is an array of strings in **kebab-case** (e.g., `"spring-boot"`, `"oauth2-resource-server"`). Never use spaces inside a tag value.
- `description` ends with a period. Keep it to one or two sentences.
- For GitHub entries, `name` matches the repository slug (e.g., `"springboot-react-keycloak"`).
- For Medium entries, `name` is the article title as a plain string.
- `url` must be a fully-qualified HTTPS URL.

## Code Style

### JavaScript

- **Style:** Vanilla ES6+ (arrow functions, `const`/`let`, template literals, `Set`, `Array.from`, destructuring). No TypeScript, no JSX, no transpilation.
- **No semicolons** — the existing code omits statement-ending semicolons throughout. Follow this convention.
- **Indentation:** 4 spaces (no tabs).
- **Quotes:** Double quotes for HTML string concatenation; single quotes are not used in the existing codebase.
- **Variable declarations:** Use `const` by default; use `let` only when reassignment is required. Never use `var`.
- **DOM references:** Plain `document.getElementById(...)` — no jQuery `$()` wrappers.
- **Functions:** Use `function` declarations for named helper functions; use arrow functions for short callbacks (`forEach`, `map`, `sort`, etc.).
- **String building:** HTML strings are built via concatenation (`+`). Template literals are not used for HTML generation in the existing code — maintain consistency.
- **No modules:** Do not introduce `import`/`export`, `require`, or any module system. All code is globally scoped.
- **No frameworks:** Do not add React, Vue, Angular, jQuery, or any other JS framework or library.
- **No linter config exists** — manually follow the patterns visible in the existing code.

### HTML

- **Indentation:** 4 spaces inside `<head>` and `<body>`; nested Tailwind `<div>` elements use 4-space increments.
- **Styling:** All styling uses Tailwind CSS utility classes (configured via the Play CDN inline config in `index.html`). Do not add a separate local stylesheet.
- **Dark mode:** Controlled via the `dark` class on `<html>`, toggled by JS. Use `dark:` variants in Tailwind classes.
- **Custom brand colours:** Defined in the Tailwind config block in `index.html` under `theme.extend.colors.brand`.

### Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| JS variables | camelCase | `activeTags`, `textQuery`, `cachedTags` |
| DOM ref constants | camelCase | `grid`, `emptyState`, `tagSearch` |
| Entry `name` (GitHub) | kebab-case slug | `"springboot-react-keycloak"` |
| Entry `name` (Medium) | Title Case prose | `"Building a ... App"` |
| Entry `tags` | kebab-case | `"spring-web-mvc"`, `"oauth2-resource-server"` |
| HTML files | lowercase | `index.html` |
| JS files | lowercase | `app.js` |

### Error Handling

There is no error handling in this codebase. The site is entirely static and read-only at runtime. Do not add `try/catch` blocks or error boundaries unless a concrete failure mode requires them.

## What NOT to Do

- Do not introduce a `package.json`, bundler (Webpack, Vite, Rollup, esbuild), or transpiler (Babel, TypeScript).
- Do not add jQuery, Semantic UI, or any other JS library or CSS framework.
- Do not add a CSS preprocessor (Sass, Less) or any custom stylesheet.
- Do not split `app.js` into multiple files — there is no module loader to stitch them back together.
- Do not add `console.log` statements.
- Do not remove or rename the `source` field values (`"github"` / `"medium"`) — they are keys into `sourceConfig` and control card rendering.
- Do not add spaces inside tag strings — spaces would break tag pill click-filtering logic.
- Do not move or reorder `cachedTags`, `renderTagList()`, or `renderCards()` above the closing `]` of the `projects` array — `getAllTags()` iterates `projects` and must run after it is fully defined.
