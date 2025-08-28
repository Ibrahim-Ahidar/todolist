import { useMemo, useState } from "react";
import TodoItem from "../components/todoItem";

function createTask(text) {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString(36) + Math.random().toString(36).slice(2);
  return { id, text: text.trim(), done: false };
}

export default function TodoApp() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTasks((prev) => [...prev, createTask(value)]);
    setText("");
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  const removeTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.done));

  const remaining = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);

  return (
    <div>
      <h1 className="title">To‑Do‑List</h1>

      <div className="form-parent">
        <form className="my-form" onSubmit={addTask}>
          <label htmlFor="taskInput" className="sr-only">
            Add a task
          </label>
          <input
            id="taskInput"
            type="text"
            className="task-in"
            value={text}
            placeholder="add a task"
            onChange={(e) => setText(e.target.value)}
            aria-label="Task text"
          />
          <button className="submit" type="submit">
            add
          </button>
        </form>
      </div>

      <ul className="todo-list" role="list">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => removeTask(task.id)}
          />
        ))}
      </ul>

      <div className="toolbar">
        <span>{remaining} left</span>
        <button
          className="clear"
          onClick={clearCompleted}
          disabled={!tasks.some((t) => t.done)}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
