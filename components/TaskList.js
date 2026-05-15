import { formatDate, isOverdue } from '../utils/dateUtils.js';

export function renderTaskList(tasks, filters, onComplete, onDelete) {
  const container = document.getElementById('taskList');

  const filtered = tasks
    .filter((t) => {
      if (filters.status === 'Active' && t.completed) return false;
      if (filters.status === 'Completed' && !t.completed) return false;
      if (filters.priority !== 'All' && t.priority !== filters.priority) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;
      return a.createdAt - b.createdAt;
    });

  if (filtered.length === 0) {
    container.innerHTML = `<p class="task-empty">${
      tasks.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match the current filters.'
    }</p>`;
    return filtered.length;
  }

  container.innerHTML = filtered.map((t) => buildCard(t)).join('');

  container.onclick = (e) => {
    const card = e.target.closest('[data-id]');
    if (!card) return;
    const id = card.dataset.id;

    if (e.target.matches('.task-checkbox')) {
      onComplete(id);
    } else if (e.target.closest('.btn-delete')) {
      if (confirm('Delete this task?')) onDelete(id);
    }
  };

  return filtered.length;
}

function buildCard(task) {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const completedClass = task.completed ? 'completed' : '';
  const due = task.dueDate ? formatDate(task.dueDate) : null;
  const overdue = !task.completed && task.dueDate && isOverdue(task.dueDate);

  return `
    <article class="task-card ${priorityClass} ${completedClass}" data-id="${task.id}">
      <input
        class="task-checkbox"
        type="checkbox"
        ${task.completed ? 'checked' : ''}
        aria-label="Mark '${escapeAttr(task.title)}' complete"
      />
      <div class="task-body">
        <div class="task-title">${escape(task.title)}</div>
        ${task.description ? `<div class="task-description">${escape(task.description)}</div>` : ''}
        <div class="task-meta">
          ${due ? `<span class="task-due${overdue ? ' overdue' : ''}">${overdue ? 'Overdue · ' : ''}${due}</span>` : ''}
          <span class="task-priority-badge ${priorityClass}">${task.priority}</span>
        </div>
      </div>
      <div class="task-actions">
        <button class="btn btn-icon btn-delete" aria-label="Delete task" title="Delete">&#x2715;</button>
      </div>
    </article>
  `;
}

function escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return str.replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}
