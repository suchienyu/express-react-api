const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

let todos = [];

app.get('/api/todos', (req, res) => {
    const activeTodos = todos.filter(todo => !todo.deleted);
    res.json(activeTodos);
});

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  console.log('Received new todo:',newTodo);
  todos.push(newTodo);
  newTodo.deleted = false;
  newTodo.id=Date.now();
  res.json(newTodo).status(201);
  console.log('!!')
  
});

app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.map(todo => {
        if (todo.id.toString() === id) {
            return { ...todo, deleted: true };
        }
        return todo;
    });
    res.json({ id });
});

app.patch('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const newText = req.body.text;

    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, text: newText };
        }
        return todo;
    });

    res.json({ message: 'Todo updated successfully', todos });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


