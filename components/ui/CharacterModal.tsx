"use client";

import { useEffect } from "react";
import { useFilterStore } from "@/store/filterStore";
import { StatusBadge } from "@/components/ui/StatusBadge";

export function CharacterModal() {
  const { selectedCharacter, closeModal } = useFilterStore();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  useEffect(() => {
    if (selectedCharacter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedCharacter]);

  if (!selectedCharacter) return null;

  const c = selectedCharacter;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative">
            <img
              src={c.image}
              alt={c.name}
              className="w-full h-80 md:h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:bg-gradient-to-r" />
            <div className="absolute bottom-4 left-4 md:hidden">
              <StatusBadge status={c.status} />
            </div>
          </div>
          <div className="p-6 space-y-5 overflow-y-auto max-h-[500px]">
             <div className="space-y-2">
              <div className="hidden md:block">
                <StatusBadge status={c.status} />
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight">
                {c.name}
              </h2>
              <p className="text-zinc-500 text-sm">
                #{c.id.toString().padStart(3, "0")}
              </p>
            </div>

            <div className="space-y-3">
              {[
                { label: "Especie",    value: c.species },
                { label: "Género",     value: c.gender },
                { label: "Tipo",       value: c.type || "—" },
                { label: "Origen",     value: c.origin.name },
                { label: "Ubicación",  value: c.location.name },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-4 py-2 border-b border-zinc-800 last:border-0">
                  <span className="text-zinc-500 text-xs shrink-0">{label}</span>
                  <span className="text-zinc-200 text-xs text-right font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-zinc-500 text-xs">
                Aparece en {c.episode.length} episodios
              </p>
              <div className="flex flex-wrap gap-1.5">
                {c.episode.slice(0, 15).map((ep) => (
                  <span
                    key={ep}
                    className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-400"
                  >
                    Ep. {ep.split("/").pop()}
                  </span>
                ))}
                {c.episode.length > 15 && (
                  <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-zinc-500">
                    +{c.episode.length - 15} más
                  </span>
                )}
              </div>
            </div>

            <p className="text-zinc-600 text-xs pt-2 border-t border-zinc-800">
              Registrado el {new Date(c.created).toLocaleDateString("es-ES")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}