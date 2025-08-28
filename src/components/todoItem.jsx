export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <label className={`item-parent ${task.done ? 'done' : ''}`}>
        <input
          type="checkbox"
          className="check-in"
          checked={task.done}
          onChange={onToggle}
          aria-label={`Mark ${task.text} as ${
            task.done ? 'incomplete' : 'done'
          }`}
        />
        <span className="task">{task.text}</span>
      </label>
      <button
        className="delete"
        onClick={onDelete}
        aria-label={`Delete ${task.text}`}
      >
        ❌
      </button>
    </li>
  );
}
