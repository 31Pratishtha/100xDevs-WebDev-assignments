import express from 'express';
import cors from 'cors';
import { getAllTodo, createTodo, updateTodo, searchTodo, deleteTodo } from './routes/todo.js';
const app = express();
const PORT = 3001;
const JWT_SECRET = "iampratishthaandiamawebdeveloper"

app.use(cors());
app.use(express.json());

// Get all todos
app.get('/todos', getAllTodo);

// Add a new todo
app.post('/todos', createTodo);

// Update a todo
app.put('/todos/:id', updateTodo);

// Delete a todo
app.delete('/todos/:id', deleteTodo);

// Search todos
app.get('/todos/search', searchTodo); // search route

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});