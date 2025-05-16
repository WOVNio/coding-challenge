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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
