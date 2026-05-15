export function initTaskFilter(onChange) {
  const container = document.getElementById('filterSection');

  container.innerHTML = `
    <div class="filter-group">
      <label class="filter-label" for="filterStatus">Status:</label>
      <select class="filter-select" id="filterStatus">
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div class="filter-group">
      <label class="filter-label" for="filterPriority">Priority:</label>
      <select class="filter-select" id="filterPriority">
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <span class="task-count" id="taskCount"></span>
  `;

  const statusEl = document.getElementById('filterStatus');
  const priorityEl = document.getElementById('filterPriority');

  function emit() {
    onChange({ status: statusEl.value, priority: priorityEl.value });
  }

  statusEl.addEventListener('change', emit);
  priorityEl.addEventListener('change', emit);
}

export function updateTaskCount(visible, total) {
  const el = document.getElementById('taskCount');
  if (el) el.textContent = `${visible} of ${total} task${total !== 1 ? 's' : ''}`;
}
