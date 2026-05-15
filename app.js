import { getTasks, saveTasks } from './utils/storage.js';
import { initTaskForm } from './components/TaskForm.js';
import { initTaskFilter, updateTaskCount } from './components/TaskFilter.js';
import { renderTaskList } from './components/TaskList.js';

let tasks = getTasks();
let filters = { status: 'All', priority: 'All' };

function render() {
  const visible = renderTaskList(tasks, filters, handleComplete, handleDelete);
  updateTaskCount(visible, tasks.length);
}

function handleComplete(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
  saveTasks(tasks);
  render();
}

function handleDelete(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks(tasks);
  render();
}

function handleAdd(task) {
  tasks = [...tasks, task];
  saveTasks(tasks);
  render();
}

function handleFilterChange(newFilters) {
  filters = newFilters;
  render();
}

initTaskFilter(handleFilterChange);
initTaskForm(handleAdd);
render();
