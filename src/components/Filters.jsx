export default function Filters({ status, setStatus, query, setQuery }) {
  return (
    <div className="card filters">
      <input
        className="input"
        placeholder="Szukaj…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="segmented">
        {[
          { k: "all", label: "Wszystkie" },
          { k: "active", label: "Aktywne" },
          { k: "done", label: "Ukończone" },
        ].map(({ k, label }) => (
          <button
            key={k}
            type="button"
            className={`seg-btn ${status === k ? "seg-active" : ""}`}
            onClick={() => setStatus(k)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
