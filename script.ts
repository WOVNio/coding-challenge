type Todo = { id: number; text: string; completed: boolean };
const API = 'http://localhost:3000';

const listEl = document.querySelector<HTMLUListElement>('#todo-list');
const formEl = document.querySelector<HTMLFormElement>('#todo-form');
const inputEl = document.querySelector<HTMLInputElement>('#new-todo');

const fetchTodos = async () => {
  const res = await fetch(`${API}/todos`);
  return res.json() as Promise<Todo[]>;
}

const addTodo = async (text: string) => {
  // Create the POST request to add a TODO
  return res.json() as Promise<Todo>;
}

const toggleTodo = async (id: number, completed: boolean) => {
  // Create the PATH request to update TODO
  return res.json() as Promise<Todo>;
}

const render = (todo: Todo) => {
  const li = document.createElement('li');
  li.className = todo.completed ? 'completed' : '';
  const span = document.createElement('span');
  span.textContent = todo.text;
  const cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = todo.completed;

  cb.addEventListener('change', async () => {
    await toggleTodo(todo.id, cb.checked);
    li.className = cb.checked ? 'completed' : '';
  });
  li.append(span, cb);
  return li;
}

const init = async () => {
  const todos = await fetchTodos();
  todos.forEach(t => listEl?.append(render(t)));
}

init().catch(console.error);

formEl?.addEventListener('submit', async e => {
  e.preventDefault();

  const text = inputEl?.value.trim();
  if (!text) return;

  const todo = await addTodo(text);
  listEl?.append(render(todo));

  if (inputEl) {
    inputEl.value = '';
  }

  console.log('Todo added:', todo);
});
