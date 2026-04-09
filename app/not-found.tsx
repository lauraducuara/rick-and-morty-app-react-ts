import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
      
      <Image
        src="/RickMortyGift.gif"
        alt="Rick and Morty"
        width={192}
        height={192}
        className="object-contain mb-8"
        unoptimized
      />

      <h1 className="text-8xl font-bold text-green-400 mb-2">404</h1>
      
      <h2 className="text-2xl font-semibold text-white mb-4">
        Dimensión no encontrada
      </h2>
      
      <p className="text-zinc-500 max-w-sm mb-8">
        Parece que Rick te mando a la dimension equivocada. 
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