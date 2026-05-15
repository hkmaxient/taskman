export function initTaskForm(onSubmit) {
  const form = document.getElementById('taskForm');
  const titleInput = document.getElementById('taskTitle');
  const descInput = document.getElementById('taskDesc');
  const dueInput = document.getElementById('taskDue');
  const priorityInput = document.getElementById('taskPriority');
  const titleError = document.getElementById('titleError');
  const toggleBtn = document.getElementById('formToggle');
  const collapse = document.getElementById('formCollapse');

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    collapse.classList.toggle('collapsed', expanded);
  });

  titleInput.addEventListener('input', () => {
    if (titleInput.value.trim()) {
      titleInput.classList.remove('invalid');
      titleError.textContent = '';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    if (!title) {
      titleInput.classList.add('invalid');
      titleError.textContent = 'Title is required.';
      titleInput.focus();
      return;
    }

    onSubmit({
      id: crypto.randomUUID(),
      title,
      description: descInput.value.trim(),
      dueDate: dueInput.value || null,
      priority: priorityInput.value,
      completed: false,
      createdAt: Date.now(),
    });

    form.reset();
    priorityInput.value = 'Medium';
    titleInput.classList.remove('invalid');
    titleError.textContent = '';
  });
}
