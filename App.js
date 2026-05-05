import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!task.trim()) return;
    setTodos([...todos, { text: task, done: false }]);
    setTask("");
  };

  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
  };

  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Todo App</h1>

      {/* Input Section */}
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
        style={{ padding: "8px", width: "200px" }}
      />
      <button
        onClick={addTodo}
        style={{ marginLeft: "10px", padding: "8px" }}
      >
        Add
      </button>

      {/* Todo List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(index)}
            />

            {/* Task Text */}
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
                fontSize: "18px",
              }}
            >
              {todo.text}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => deleteTodo(index)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;