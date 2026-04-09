"use client";

import { useState, useEffect } from "react";
import { useFilterStore } from "@/store/filterStore";
import { useCharacters } from "@/hooks/useCharacters";
import { CharacterFilters } from "@/components/characters/CharacterFilters";
import { CharacterGrid } from "@/components/characters/CharacterGrid";
import { CharacterChart } from "@/components/charts/CharacterChart";

export default function HomePage() {
  const { search, status } = useFilterStore();
  const [page, setPage] = useState(1);

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
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <main className="min-h-screen pb-20 bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter text-white">
                Rick and Morty
              </h1>
              <p className="text-zinc-500 mt-1 text-lg">
                Explora el multiverso  de Rick y Morty• {data?.info.count?.toLocaleString() || 0} personajes
              </p>
            </div>
            <div className="text-4xl opacity-80">🌌</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-10 space-y-12">
          <CharacterFilters />
        <CharacterChart />
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">Todos los personajes</h2>
            
            {totalPages > 1 && (
              <div className="text-zinc-500 text-sm flex items-center gap-2">
                Página <span className="text-white font-medium">{page}</span> de {totalPages}
              </div>
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
                className="px-8 py-3 rounded-2xl border border-zinc-700 hover:border-zinc-600 disabled:opacity-40 disabled:hover:border-zinc-700 transition-all flex items-center gap-2 text-sm font-medium"
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
                className="px-8 py-3 rounded-2xl border border-zinc-700 hover:border-zinc-600 disabled:opacity-40 disabled:hover:border-zinc-700 transition-all flex items-center gap-2 text-sm font-medium"
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-20 border-t border-zinc-800 py-8 text-center text-zinc-600 text-xs">
        <p>
          Proyecto demo con Next.js realizado por <a href="https://www.linkedin.com/in/laura-alejandra-ducuara-covos-6b2650208/" target="_blank" className="hover:text-green-400 transition-colors">Laura Ducuara</a>
        </p>
        <p className="mt-1">Datos de <a href="https://rickandmortyapi.com" target="_blank" className="hover:text-green-400 transition-colors">Rick y Morty API</a></p>
      </footer>
    </main>
  );
}