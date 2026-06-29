const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "./todos.json";

function readTodos() {
  return JSON.parse(fs.readFileSync(FILE));
}

function writeTodos(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

// GET all todos
app.get("/todos", (req, res) => {
  res.json(readTodos());
});

// GET single todo
app.get("/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id == req.params.id);
  res.json(todo);
});

// CREATE todo
app.post("/todos", (req, res) => {
  console.log("POST HIT");
  console.log("BODY:", req.body);

  const todos = readTodos();

  const newTodo = {
    id: Date.now(),
    ...req.body
  };

  todos.push(newTodo);
  writeTodos(todos);

  res.json(newTodo);
});
// UPDATE todo
app.put("/todos/:id", (req, res) => {
  let todos = readTodos();

  todos = todos.map(todo =>
    todo.id == req.params.id
      ? { ...todo, ...req.body }
      : todo
  );

  writeTodos(todos);
  res.json({ message: "Updated" });
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  let todos = readTodos();

  todos = todos.filter(todo => todo.id != req.params.id);

  writeTodos(todos);
  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});