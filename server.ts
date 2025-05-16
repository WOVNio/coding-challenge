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

  // Create a new TODO
  const newTodo: Todo
  res.status(201).json(newTodo);
});

// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { completed } = req.body as { completed?: boolean };

  // Check if TODO exists
  // If exist, Mark TODO as completed or not
  res.json(todo);
});

app.listen(3000, () => {
  console.log('API listening on http://localhost:3000');
});
