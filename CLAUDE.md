# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the app

No build step. Serve `index.html` from any static file server:

```sh
python3 -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly as a `file://` URL will fail because ES modules require HTTP.

## Architecture

`app.js` is the root. It owns the single source of truth — the `tasks` array and the `filters` object — and re-renders on every mutation. Components never hold state.

**Data flow:**

```
app.js (state owner)
  ├── initTaskForm(handleAdd)       → TaskForm.js
  ├── initTaskFilter(handleFilterChange) → TaskFilter.js
  └── render() → renderTaskList(tasks, filters, handleComplete, handleDelete) → TaskList.js
```

Components communicate upward exclusively via the callbacks passed at init time. There is no event bus and no shared mutable state.

**Task shape:**

```js
{
  id: string,          // crypto.randomUUID()
  title: string,
  description: string,
  dueDate: string | null,  // ISO date "YYYY-MM-DD" or null
  priority: 'Low' | 'Medium' | 'High',
  completed: boolean,
  createdAt: number,   // Date.now()
}
```

**Key details:**

- `TaskList.js` uses a single delegated `container.onclick` handler — do not add per-card listeners.
- XSS prevention is manual: `escape()` for text content, `escapeAttr()` for attribute values. Both are local to `TaskList.js`. Any new place that interpolates user data into HTML must use them.
- `TaskFilter.js` renders its own HTML into `#filterSection` on init; `TaskList.js` renders into `#taskList` on every `render()` call.
- Filtering and sorting logic both live in `renderTaskList` in `TaskList.js`. Sort order: tasks with due dates first (ascending), then by `createdAt`.

## Constraints

- All `localStorage` access must go through `utils/storage.js` (`getTasks` / `saveTasks`). No other file may read or write `localStorage` directly.
- No inline styles. All styling through `style.css`.
- No external libraries, no frameworks, no build step. Vanilla JS ES6 modules only.
