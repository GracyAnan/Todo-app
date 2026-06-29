import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/todos");
      setTodos(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

 
 const addTodo = async () => {
  if (input.trim() === "") return;

  try {
    await axios.post("http://127.0.0.1:5000/todos", {
      text: input,
      completed: false
    });

    setInput("");
    fetchTodos();
  } catch (error) {
    console.log("Add Error:", error);
  }
};

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);

      await axios.put(`http://127.0.0.1:5000/todos/${id}`, {
        completed: !todo.completed
      });

      fetchTodos();
    } catch (error) {
      console.log("Update Error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9"
      }}
    >
      <div
        style={{
          width: "500px",
          padding: "30px",
          background: "white",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          Todo List 
        </h1>

        <p
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#555",
          fontWeight: "bold"
        }}
>
  Total: {todos.length} | Completed: {todos.filter(todo => todo.completed).length} | Pending: {todos.filter(todo => !todo.completed).length}
</p>

      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />


        

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

        <button
        onClick={addTodo}

        style={{
          padding: "10px 15px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Add
      </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {todos
            .filter((todo) =>
              todo.text.toLowerCase().includes(search.toLowerCase())
            )
            .map((todo) => (
            <li
              key={todo.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#eef2ff",
                marginBottom: "10px",
                padding: "12px",
                borderRadius: "8px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}
              >
                <button
                  onClick={() => toggleComplete(todo.id)}
                  style={{
                    border: "none",
                    background: "transparent",
                    fontSize: "22px",
                    cursor: "pointer"
                  }}
                >
                  {todo.completed ? "✅" : "⬜"}
                </button>

                <span
                  onClick={() => navigate(`/todo?id=${todo.id}`)}
                  style={{
                    cursor: "pointer",
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    color: todo.completed ? "gray" : "black"
                  }}
                >
                  {todo.text}
                </span>
              </div>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;