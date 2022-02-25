const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
let todos = [
    {title: "Read Dune", done: true, _id: "123"},
    {title: "Read Children of Dune", done: true, _id: "234"},
    {title: "Read Foundation", done: true, _id: "345"},
    {title: "Read Forever war", done: false, _id: "456"}
];
app.get('/todos', (req, res) => res.json(todos));
app.delete('/todos/:tid', (req, res) => {
    const tid = req.params.tid;
    todos = todos.filter((todo) => { return todo._id !== tid});
    res.json(todos);
});
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    newTodo._id = (new Date()).getTime() + "";
    todos.push(newTodo);
    res.json(todos);
});
app.put('/todos/:tid', (req, res) => {
    const tid = req.params.tid;
    const newTodo = req.body;
    todos = todos.map(todo => todo._id === tid ? newTodo : todo);
    res.json(todos);
});
app.listen(4000);