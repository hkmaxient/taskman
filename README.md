# Task Manager

A lightweight, zero-dependency task manager that runs in the browser. No build step, no frameworks — just vanilla JS ES6 modules.

## Features

- Add tasks with title, description, due date, and priority (Low / Medium / High)
- Mark tasks complete or delete them
- Filter by status (All / Active / Completed) and priority
- Tasks persist across page reloads via `localStorage`
- Tasks with due dates sort first (ascending), then by creation time

## Getting Started

Serve the project root over HTTP — ES modules require it:

```sh
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

> Opening `index.html` directly as a `file://` URL will not work.

## Project Structure

```
taskman/
├── index.html              # Entry point
├── app.js                  # State owner; wires components together
├── style.css               # All styling
├── components/
│   ├── TaskForm.js         # Add-task form
│   ├── TaskFilter.js       # Status/priority filter bar
│   └── TaskList.js         # Task card list + filtering/sorting logic
└── utils/
    ├── storage.js          # localStorage read/write (getTasks / saveTasks)
    └── dateUtils.js        # Date formatting helpers
```

## Architecture

`app.js` owns the single source of truth — the `tasks` array and `filters` object — and re-renders on every mutation. Components are stateless and communicate upward via callbacks.

```
app.js
  ├── initTaskForm(handleAdd)
  ├── initTaskFilter(handleFilterChange)
  └── render() → renderTaskList(tasks, filters, handleComplete, handleDelete)
```

### Task shape

```js
{
  id:          string,   // crypto.randomUUID()
  title:       string,
  description: string,
  dueDate:     string | null,  // "YYYY-MM-DD" or null
  priority:    'Low' | 'Medium' | 'High',
  completed:   boolean,
  createdAt:   number,  // Date.now()
}
```

## Constraints

- All `localStorage` access goes through `utils/storage.js`. No other file touches it directly.
- No inline styles — all styling in `style.css`.
- No external libraries, no frameworks, no build tooling.
