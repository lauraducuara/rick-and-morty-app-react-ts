"use client";

import { useFilterStore } from "@/store/filterStore";
import { SearchInput } from "@/components/ui/SearchInput";

const STATUS_OPTIONS = [
  { value: "",        label: "Todos" },
  { value: "alive",   label: "Vivos" },
  { value: "dead",    label: "Muertos" },
  { value: "unknown", label: "Desconocido" },
];

export function CharacterFilters() {
  const { search, status, setSearch, setStatus, reset } = useFilterStore();
  const hasFilters = search || status;

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <SearchInput value={search} onChange={setSearch} />

      <div className="flex gap-2 flex-wrap">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStatus(opt.value)}
            className={`
              px-3 py-2 rounded-xl text-xs font-medium
              transition-colors whitespace-nowrap
              ${status === opt.value
                ? "bg-green-500 text-zinc-900"
                : "bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-zinc-200"
              }
            `}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {hasFilters && (
        <button
          onClick={reset}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-2"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}