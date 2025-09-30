import { useState } from "react";

export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.title);

  function save() {
    const t = draft.trim();
    if (!t || t === item.title) {
      setIsEditing(false);
      return;
    }
    onEdit(item.id, t);
    setIsEditing(false);
  }

  const overdue = item.due && !item.done && new Date(item.due) < new Date();

  return (
    <div className={`todo ${item.done ? "todo-done" : ""}`}>
      <label className="check">
        <input type="checkbox" checked={item.done} onChange={() => onToggle(item.id)} />
        <span />
      </label>

      {isEditing ? (
        <input
          className="input inline"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && save()}
          onBlur={save}
          autoFocus
        />
      ) : (
        <div className="todo-main" onDoubleClick={() => setIsEditing(true)}>
          <div className="todo-title">{item.title}</div>
          <div className="todo-meta">
            {item.category}
            {" · "}
            <span className={`pill pill-${item.priority || "med"}`}>
              {item.priority === "high"
                ? "Wysoki"
                : item.priority === "low"
                ? "Niski"
                : "Średni"}
            </span>
            {item.due && (
              <>
                {" · "}
                <span className={overdue ? "overdue" : ""}>termin: {item.due}</span>
              </>
            )}
          </div>
        </div>
      )}

      <button className="icon-btn" title="Usuń" onClick={() => onDelete(item.id)}>
        ×
      </button>
    </div>
  );
}
