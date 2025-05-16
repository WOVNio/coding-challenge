import express from 'express';
import bodyParser from 'body-parser';

type Todo = { id: number; text: string; completed: boolean };
let todos: Todo[] = [
  { id: 1, text: 'Learn TypeScript', completed: false },
  { id: 2, text: 'Write interview challenge', completed: true }
];

const app = express();
app.use(bodyParser.json());
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// GET /todos
app.get('/todos', (_, res) => {
  res.json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const { text } = req.body as { text?: string };
  if (!text) return res.status(400).json({ error: 'Missing text' });
  const nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
  const newTodo: Todo = { id: nextId, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body as { completed?: boolean };
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Not found' });
  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Missing completed flag' });
  }
  todo.completed = completed;
  res.json(todo);
});

app.listen(3000, () => {
  console.log('API listening on http://localhost:3000');
});
