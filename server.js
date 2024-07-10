require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./database/db'); // 導入資料庫連接
const app = express();
const PORT = 5001;


app.use(cors());
app.use(bodyParser.json());

let todos = [];

// app.get('/api/todos', (req, res) => {
//     const activeTodos = todos.filter(todo => !todo.deleted);
//     res.json(activeTodos);
// });

//  獲取代辦事項
app.get('/api/todos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM todos WHERE deleted = FALSE ORDER BY id ASC');
      res.json(result.rows);
    } catch (err) {
      console.error('查詢失敗', err);
      res.status(500).send('伺服器錯誤');
    }
  });

// app.post('/api/todos', (req, res) => {
//   const newTodo = req.body;
//   console.log('Received new todo:',newTodo);
//   todos.push(newTodo);
//   newTodo.deleted = false;
//   newTodo.id=Date.now();
//   res.json(newTodo).status(201);
//   console.log('!!')
  
// });

// 新增代辦事項
app.post('/api/todos', async (req, res) => {
    const { text } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO todos (text, completed,deleted) VALUES ($1, FALSE,FALSE) RETURNING *',
        [text]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('新增失敗', err);
      res.status(500).send('伺服器錯誤');
    }
  });


// app.delete('/api/todos/:id', (req, res) => {
//     const { id } = req.params;
//     todos = todos.map(todo => {
//         if (todo.id.toString() === id) {
//             return { ...todo, deleted: true };
//         }
//         return todo;
//     });
//     res.json({ id });
// });

//刪除代辦事項
app.delete('/api/todos/:id', async (req, res) => {
    
    
    try {
      await pool.query('UPDATE todos SET deleted = TRUE WHERE id = $1', [id]);
      res.json({ id });
    } catch (err) {
      console.error('刪除失敗', err);
      res.status(500).send('伺服器錯誤');
    }
  });


// app.patch('/api/todos/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const newText = req.body.text;

//     todos = todos.map(todo => {
//         if (todo.id === id) {
//             return { ...todo, text: newText };
//         }
//         return todo;
//     });

//     res.json({ message: 'Todo updated successfully', todos });
// });

//更新代辦事項
app.patch('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
      const result = await pool.query(
        'UPDATE todos SET text = $1 WHERE id = $2 RETURNING *',
        [text, id]
      );
      res.json({ message: 'Todo updated successfully', todo: result.rows[0] });
    } catch (err) {
      console.error('更新失敗', err);
      res.status(500).send('伺服器錯誤');
    }
  });


app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server is running on port ${PORT}`);
});


