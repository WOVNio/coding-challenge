type Todo = { id: number; text: string; completed: boolean };

const API_BASE = 'http://localhost:3000';
const listEl = document.getElementById('todo-list') as HTMLUListElement;
const formEl = document.getElementById('todo-form') as HTMLFormElement;
const inputEl = document.getElementById('new-todo') as HTMLInputElement;

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_BASE}/todos`);
  return res.json();
}

async function addTodo(text: string): Promise<Todo> {
  const res = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}

async function toggleTodo(id: number, completed: boolean): Promise<Todo> {
  const res = await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  return res.json();
}

function renderTodoItem(todo: Todo) {
  const li = document.createElement('li');
  li.className = todo.completed ? 'completed' : '';
  
  const span = document.createElement('span');
  span.textContent = todo.text;
  li.appendChild(span);

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', async () => {
    await toggleTodo(todo.id, checkbox.checked);
    li.className = checkbox.checked ? 'completed' : '';
  });
  li.appendChild(checkbox);

  return li;
}

async function init() {
  const todos = await fetchTodos();
  todos.forEach(t => listEl.appendChild(renderTodoItem(t)));

  formEl.addEventListener('submit', async e => {
    e.preventDefault();
    const text = inputEl.value.trim();
    if (!text) return;
    const newTodo = await addTodo(text);
    listEl.appendChild(renderTodoItem(newTodo));
    inputEl.value = '';
  });
}

init().catch(console.error);
