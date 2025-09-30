import { useState } from "react";

export default function CategoryPicker({
  categories,
  active,
  onPick,
  onAddCategory,
  onDeleteCategory,
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const name = draft.trim();
    if (!name) return;
    const exists = categories.some((c) => c.toLowerCase() === name.toLowerCase());
    if (exists) return;
    onAddCategory?.(name);
    setDraft("");
  }

  return (
    <div className="card categories">
      <div className="row">
        <strong>Kategorie:</strong>
        <div className="chips">
          {categories.map((c) => (
            <div key={c} className={`chip ${active === c ? "chip-active" : ""}`} title={c}>
              <button
                type="button"
                className="chip-label"
                onClick={() => onPick?.(c)}
                aria-pressed={active === c}
              >
                {c}
              </button>

              {c !== "Główne" && (
                <button
                  type="button"
                  className="chip-del"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCategory?.(c);
                  }}
                  aria-label={`Usuń kategorię: ${c}`}
                  title={`Usuń kategorię: ${c}`}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="row addcat">
        <input
          className="input"
          placeholder="Nowa kategoria"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button className="btn" type="button" onClick={add}>
          Dodaj kategorię
        </button>
      </div>
    </div>
  );
}

