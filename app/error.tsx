"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
      <span className="text-8xl mb-6">🛸</span>

      <h1 className="text-4xl font-bold text-white mb-3">Algo salió mal</h1>

      <p className="text-zinc-500 max-w-sm mb-2">
        No pudimos conectar con el multiverso. Puede ser un problema de conexión
        o la API no está respondiendo.
      </p>
      {error.message && (
        <p className="text-xs text-zinc-600 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 mb-8 max-w-sm font-mono">
          {error.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="
            px-6 py-3 rounded-xl bg-green-500 text-zinc-900
            font-semibold hover:bg-green-400 transition-colors
          "
        >
          Intentar de nuevo
        </button>

        <a
          href="/"
          className="
            px-6 py-3 rounded-xl border border-zinc-700 text-zinc-300
            hover:border-zinc-500 hover:text-white transition-colors
          "
        >
          Ir al inicio
        </a>
      </div>
    </main>
  );
}
