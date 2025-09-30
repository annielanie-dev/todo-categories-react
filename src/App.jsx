import { useEffect, useMemo, useReducer, useState } from "react";
import Header from "./components/Header.jsx";
import TodoForm from "./components/TodoForm.jsx";
import CategoryPicker from "./components/CategoryPicker.jsx";
import Filters from "./components/Filters.jsx";
import TodoItem from "./components/TodoItem.jsx";
import EmptyState from "./components/EmptyState.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";

// ============== KONFIG ==============
const STORAGE_KEY = "todo-categories-v2";

// ============== STARTER ==============
const initialState = {
  categories: ["Główne", "Studia", "Praca", "Projekty"],
  selectedCategory: "Główne",
  tasks: [
    {
      id: crypto.randomUUID(),
      title: "Research do projektów",
      category: "Projekty",
      done: false,
      createdAt: Date.now(),
      priority: "med",
      due: null,
    },
  ],
};

// istnienie kategorii „Główne”
function ensureMain(state) {
  return state.categories.includes("Główne")
    ? state
    : { ...state, categories: ["Główne", ...state.categories] };
}

// ============== REDUCER ==============
function reducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return ensureMain(action.payload);

    case "ADD_TASK": {
      const newTask = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        category: action.payload.category,
        done: false,
        createdAt: Date.now(),
        priority: action.payload.priority || "med",
        due: action.payload.due || null,
      };
      return { ...state, tasks: [newTask, ...state.tasks] };
    }

    case "TOGGLE_TASK": {
      const tasks = state.tasks.map((t) =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
      return { ...state, tasks };
    }

    case "EDIT_TASK": {
      const { id, title } = action.payload;
      const tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, title } : t
      );
      return { ...state, tasks };
    }

    case "DELETE_TASK": {
      const tasks = state.tasks.filter((t) => t.id !== action.payload);
      return { ...state, tasks };
    }

    case "CLEAR_DONE": {
      const tasks = state.tasks.filter((t) => !t.done);
      return { ...state, tasks };
    }

    case "ADD_CATEGORY": {
      const name = String(action.payload || "").trim();
      if (!name) return state;
      // unikam duplikatów (case-insensitive)
      const exists = state.categories.some(
        (c) => c.toLowerCase() === name.toLowerCase()
      );
      if (exists) return state;
      const categories = [...state.categories, name];
      return { ...state, categories };
    }

    case "DELETE_CATEGORY": {
      const cat = action.payload;
      if (cat === "Główne") return state; // nie kasuje bazowej kat.
      const selectedCategory =
        state.selectedCategory === cat ? "Główne" : state.selectedCategory;

      // przenosze zadania do „Główne”
      const tasks = state.tasks.map((t) =>
        t.category === cat ? { ...t, category: "Główne" } : t
      );

      const categories = state.categories.filter((c) => c !== cat);
      return ensureMain({ ...state, tasks, categories, selectedCategory });
    }

    case "PICK_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "RESET_DEMO":
      return ensureMain({
        categories: ["Główne", "Studia", "Praca", "Projekty"],
        selectedCategory: "Główne",
        tasks: [
          {
            id: crypto.randomUUID(),
            title: "Research do projektów",
            category: "Projekty",
            done: false,
            createdAt: Date.now(),
            priority: "med",
            due: null,
          },
        ],
      });

    default:
      return state;
  }
}

// ============== FUNKCJE: eksport / import JSON ==============
function exportJSON(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "todo-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importJSON(file, onLoaded) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      onLoaded(data);
    } catch {
      alert("Nieprawidłowy plik JSON.");
    }
  };
  reader.readAsText(file);
}

// ============== APP ==============
export default function App() {
  const [persisted, setPersisted] = useLocalStorage(STORAGE_KEY, initialState);
  const [state, dispatch] = useReducer(reducer, persisted);

  // mirror → localStorage
  useEffect(() => {
    setPersisted(state);
  }, [state, setPersisted]);

  const [status, setStatus] = useState("all"); // all | active | done
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("created-desc"); // created-desc | az | done-last

  const filtered = useMemo(() => {
    return state.tasks
      .filter((t) =>
        state.selectedCategory ? t.category === state.selectedCategory : true
      )
      .filter((t) =>
        status === "active" ? !t.done : status === "done" ? t.done : true
      )
      .filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
  }, [state.tasks, state.selectedCategory, status, query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sortBy === "az") arr.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "created-desc")
      arr.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
    if (sortBy === "done-last")
      arr.sort((a, b) => Number(a.done) - Number(b.done));
    return arr;
  }, [filtered, sortBy]);

  function handleDeleteCategory(cat) {
    const count = state.tasks.filter((t) => t.category === cat).length;
    const ok = window.confirm(
      count
        ? `Usunąć kategorię "${cat}"?\n${count} zadań zostanie przeniesionych do "Główne".`
        : `Usunąć kategorię "${cat}"?`
    );
    if (!ok) return;
    dispatch({ type: "DELETE_CATEGORY", payload: cat });
  }

  return (
    <div className="container">
      <Header />

      <CategoryPicker
        categories={state.categories}
        active={state.selectedCategory}
        onPick={(c) => dispatch({ type: "PICK_CATEGORY", payload: c })}
        onAddCategory={(name) => dispatch({ type: "ADD_CATEGORY", payload: name })}
        onDeleteCategory={handleDeleteCategory}
      />

      <TodoForm
        categories={state.categories}
        onAdd={({ title, category, priority, due }) =>
          dispatch({
            type: "ADD_TASK",
            payload: { title, category, priority, due },
          })
        }
      />

      <Filters
        status={status}
        setStatus={setStatus}
        query={query}
        setQuery={setQuery}
      />

      {/* Sortuje */}
      <div className="card" style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <strong>Sortowanie:</strong>
        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created-desc">Najnowsze</option>
          <option value="az">A–Z</option>
          <option value="done-last">Ukończone na dół</option>
        </select>
      </div>

      {/* Lista */}
      <div className="card list">
        {sorted.length === 0 ? (
          <EmptyState />
        ) : (
          sorted.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onToggle={(id) => dispatch({ type: "TOGGLE_TASK", payload: id })}
              onDelete={(id) => dispatch({ type: "DELETE_TASK", payload: id })}
              onEdit={(id, title) =>
                dispatch({ type: "EDIT_TASK", payload: { id, title } })
              }
            />
          ))
        )}
      </div>

      {/* Akcje w stopce */}
      <div className="footer row">
        <span>
          {sorted.length} / {state.tasks.length} widoczne
        </span>
        <div className="row" style={{ gap: 8 }}>
          <button
            className="btn subtle"
            onClick={() => dispatch({ type: "CLEAR_DONE" })}
          >
            Usuń ukończone
          </button>

          <button className="btn" onClick={() => exportJSON(state)}>
            Eksportuj JSON
          </button>

          <label className="btn" style={{ cursor: "pointer" }}>
            Importuj JSON
            <input
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                importJSON(f, (data) => {
                  dispatch({ type: "LOAD", payload: data });
                });
                e.target.value = "";
              }}
            />
          </label>

          <button
            className="btn"
            onClick={() => {
              const ok = window.confirm(
                "Przywrócić dane demo? (Nadpisze bieżące)"
              );
              if (!ok) return;
              dispatch({ type: "RESET_DEMO" });
            }}
          >
            Przywróć dane demo
          </button>
        </div>
      </div>
    </div>
  );
}




