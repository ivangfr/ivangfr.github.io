# AGENTS.md

Guidelines for agentic coding agents working in this repository.

## Project Overview

This is a **vanilla JavaScript static website** hosted on GitHub Pages at `ivangfr.github.io`. It is a single-page portfolio listing Ivan Franchin's GitHub Proof-of-Concept repositories and Medium articles. There is no build system, package manager, bundler, or transpilation step.

**Source files:**
- `index.html` — the single HTML page (82 lines)
- `app.js` — all application logic and data (~1722 lines)

**Runtime dependencies (CDN only — no local installs):**
- jQuery 3.7.1
- Semantic UI 2.5.0 (CSS + JS)
- Google Analytics 4 (`gtag.js`)

## Build / Lint / Test Commands

There is **no build step, no package manager, no linter, and no test suite** in this project.

**To preview the site locally**, use any static file server:
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

- **`index.html`** — declares the Semantic UI layout structure (grid, dropdown filter, list container). Contains no inline JavaScript logic beyond the Google Analytics snippet.
- **`app.js`** — contains:
  1. A `projects` array (module-level constant) holding every entry.
  2. A `githubUrl` constant (currently unused at runtime, kept for reference).
  3. A jQuery `$(function() { ... })` document-ready block that renders entries and wires up the tag filter dropdown.

There are no ES modules, no `import`/`export` statements, no `require()` calls, and no bundler. Everything runs in the browser global scope. `app.js` is loaded as a plain `<script src="app.js">` tag at the bottom of `<body>`, after jQuery and Semantic UI have loaded.

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
- `source` must be either `"github"` or `"medium"` — these values map directly to Semantic UI icon class names rendered in the list.
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
- **jQuery variables:** Prefix jQuery-wrapped DOM references with `$` (e.g., `$projectList`, `$tagOptions`, `$this`).
- **Functions:** Use `function` declarations for named helper functions inside the document-ready block; use arrow functions for short callbacks (`forEach`, `map`, `sort`, etc.).
- **String building:** HTML strings are built via concatenation (`+`). There are no template literals used for HTML generation in the existing code — maintain consistency.
- **No modules:** Do not introduce `import`/`export`, `require`, or any module system. All code is globally scoped.
- **No frameworks:** Do not add React, Vue, Angular, or any other JS framework.
- **No linter config exists** — manually follow the patterns visible in the existing code.

### HTML

- **Indentation:** 4 spaces inside `<head>` and `<body>`; nested Semantic UI `<div>` grid elements use 4-space increments.
- **Attributes:** No quotes around attribute values in dynamically built HTML strings (matching existing `app.js` patterns, e.g., `id=` + i, `href=` + url).
- **Class names:** Use Semantic UI utility class strings exactly as documented (e.g., `"ui small label"`, `"ui relaxed big celled selection list"`).
- **No custom CSS** — all styling is handled by Semantic UI CDN classes. Do not add a local stylesheet.

### Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| JS variables | camelCase | `projectIds`, `tagItems`, `allTags` |
| jQuery refs | camelCase with `$` prefix | `$projectList`, `$tagOptions` |
| Entry `name` (GitHub) | kebab-case slug | `"springboot-react-keycloak"` |
| Entry `name` (Medium) | Title Case prose | `"Building a ... App"` |
| Entry `tags` | kebab-case | `"spring-web-mvc"`, `"oauth2-resource-server"` |
| HTML files | lowercase | `index.html` |
| JS files | lowercase | `app.js` |

### Error Handling

There is no error handling in this codebase. The site is entirely static and read-only at runtime. Do not add `try/catch` blocks or error boundaries unless a concrete failure mode requires them.

## What NOT to Do

- Do not introduce a `package.json`, bundler (Webpack, Vite, Rollup, esbuild), or transpiler (Babel, TypeScript).
- Do not add a CSS preprocessor (Sass, Less) or any custom stylesheet.
- Do not upgrade or replace jQuery or Semantic UI versions without verifying full compatibility.
- Do not split `app.js` into multiple files — there is no module loader to stitch them back together.
- Do not add `console.log` statements (there is already one in `handleFilter` that could be cleaned up, but do not add more).
- Do not remove or rename the `source` field values (`"github"` / `"medium"`) — they are used as Semantic UI icon class names directly.
- Do not add spaces inside tag strings — tags double as CSS class selectors in the filter logic (`'.item.' + value`), so spaces would break selector construction.
