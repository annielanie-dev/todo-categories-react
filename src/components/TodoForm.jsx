import { useState } from "react";

export default function TodoForm({ onAdd, categories }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0] || "Główne");
  const [priority, setPriority] = useState("med"); // "low" | "med" | "high"
  const [due, setDue] = useState(""); // YYYY-MM-DD

  function submit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onAdd({ title: t, category, priority, due: due || null });
    setTitle("");
    // zostawiam ostatnio wybraną kategorię/priorytet
  }

  return (
    <form className="card form" onSubmit={submit}>
      <input
        className="input"
        placeholder="Dodaj zadanie…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        className="select"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        title="Priorytet"
      >
        <option value="low">Niski</option>
        <option value="med">Średni</option>
        <option value="high">Wysoki</option>
      </select>

      <input
        className="input"
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        title="Termin"
      />

      <button className="btn primary" type="submit">
        Dodaj
      </button>
    </form>
  );
}
