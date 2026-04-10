import { useFilterStore } from "@/store/filterStore";
import { useState } from "react";

export function SortDropdown() {
  const { sort, setSort } = useFilterStore();
  const [open, setOpen] = useState(false);

  const SORT_OPTIONS = [
    { value: "default", label: "Defecto" },
    { value: "az", label: "A → Z" },
    { value: "za", label: "Z → A" },
    { value: "newest", label: "Recientes" },
    { value: "oldest", label: "Antiguos" },
  ];

  return (
    <div className="relative z-30 ">
     <button
  onClick={() => setOpen(!open)}
  className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-sm"
>
  Ordenar: {SORT_OPTIONS.find((o) => o.value === sort)?.label}
</button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border border-zinc-700 rounded-lg">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setSort(opt.value); 
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}