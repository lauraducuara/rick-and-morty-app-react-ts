import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
      
      <img
        src="/RickMortyGift.gif"
        alt="Rick and Morty"
        className="w-48 h-48 object-contain mb-8"
      />

      <h1 className="text-8xl font-bold text-green-400 mb-2">404</h1>
      
      <h2 className="text-2xl font-semibold text-white mb-4">
        Dimensión no encontrada
      </h2>
      
      <p className="text-zinc-500 max-w-sm mb-8">
        Parece que Rick te mandó a la dimensión equivocada. 
        Esta página no existe en ninguno de los universos conocidos.
      </p>

      <Link
        href="/"
        className="
          px-6 py-3 rounded-xl bg-green-500 text-zinc-900 
          font-semibold hover:bg-green-400 transition-colors
        "
      >
        Volver al universo principal
      </Link>

    </main>
  );
}