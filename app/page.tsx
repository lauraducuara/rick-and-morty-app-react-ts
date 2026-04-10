"use client";

import { useState, useEffect } from "react";
import { useFilterStore } from "@/store/filterStore";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterFilters } from "@/components/characters/CharacterFilters";
import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { CharacterChart } from "@/components/charts/CharacterChart";
import { CharacterModal } from "@/components/ui/CharacterModal";

type Tab = "characters" | "stats";

export default function HomePage() {
  const { search, status } = useFilterStore();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("characters");

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const { data, isLoading, isError, error } = useCharacters({
    name: search || undefined,
    status: status || undefined,
    page,
  });

  const totalPages = data?.info.pages || 1;
  const hasNext = !!data?.info.next;
  const hasPrev = !!data?.info.prev;

  const goToNext = () => hasNext && setPage((p) => p + 1);
  const goToPrev = () => hasPrev && setPage((p) => p - 1);
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <main className="min-h-screen pb-20 bg-zinc-950">

      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 p-5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🧬</span>
            <div>
              <h1
                className="font-bold text-white leading-none"
                style={{ fontSize: "28px" }}
              >
                Rick & Morty
              </h1>
              <p className="text-zinc-500 text-xs mt-0.5">
                {data?.info.count?.toLocaleString() || 0} personajes
              </p>
            </div>
          </div>

          <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
            {([
              { key: "characters", label: "👾 Personajes" },
              { key: "stats", label: "📊 Estadísticas" },
            ] as { key: Tab; label: string }[]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${activeTab === tab.key
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                  }
          `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 pt-10">
        {activeTab === "characters" && (
          <div className="space-y-6">
            <CharacterFilters />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">
                Todos los personajes
              </h2>
              {totalPages > 1 && (
                <p className="text-zinc-500 text-sm">
                  Página <span className="text-white font-medium">{page}</span> de {totalPages}
                </p>
              )}
            </div>

            <CharacterGrid
              characters={data?.results || []}
              isLoading={isLoading}
              isError={isError}
              errorMessage={error?.message || "Error al cargar los personajes"}
            />

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <button
                  onClick={goToPrev}
                  disabled={!hasPrev}
                  className="px-8 py-3 rounded-2xl border border-zinc-700 hover:border-zinc-600 disabled:opacity-40 transition-all text-sm font-medium"
                >
                  ← Anterior
                </button>

                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-2">
                  <span className="text-zinc-500 text-sm">Ir a página</span>
                  <input
                    type="number"
                    min={1}
                    max={totalPages}
                    value={page}
                    onChange={(e) => goToPage(Number(e.target.value))}
                    className="w-16 bg-transparent text-center text-white font-medium focus:outline-none border border-zinc-700 rounded-lg py-1"
                  />
                  <span className="text-zinc-500 text-sm">de {totalPages}</span>
                </div>

                <button
                  onClick={goToNext}
                  disabled={!hasNext}
                  className="px-8 py-3 rounded-2xl border border-zinc-700 hover:border-zinc-600 disabled:opacity-40 transition-all text-sm font-medium"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Estadísticas</h2>
              <p className="text-zinc-500 text-sm mt-1">
                Análisis visual de los {data?.info.count?.toLocaleString() || 826} personajes del multiverso
              </p>
            </div>
            <CharacterChart />
          </div>
        )}

      </div>

      <footer className="mt-20 border-t border-zinc-800 py-8 text-center text-zinc-600 text-xs">
        <p>
          Proyecto demo con Next.js realizado por{" "}
          <a
            href="https://www.linkedin.com/in/laura-alejandra-ducuara-covos-6b2650208/"
            target="_blank"
            className="hover:text-green-400 transition-colors"
          >
            Laura Ducuara
          </a>
        </p>
        <p className="mt-1">
          Datos de{" "}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            className="hover:text-green-400 transition-colors"
          >
            Rick and Morty API
          </a>
        </p>
      </footer>

      <CharacterModal />
    </main>
  );
}