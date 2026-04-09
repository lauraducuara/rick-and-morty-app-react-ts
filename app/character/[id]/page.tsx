"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCharacter } from "@/hooks/useCharacters";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LoadingSpinner, ErrorMessage } from "@/components/ui/Feedback";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: character, isLoading, isError, error } = useCharacter(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !character) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <ErrorMessage 
          message={error?.message || "No se pudo cargar el personaje."} 
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pb-12">
      {/* Botón volver */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          ← Volver a la lista
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Imagen */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="aspect-square rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <StatusBadge status={character.status} />
                <span className="text-zinc-500 text-sm">
                  #{character.id.toString().padStart(3, "0")}
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-tight">
                {character.name}
              </h1>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-zinc-500 mb-1">Especie</p>
                <p className="text-zinc-100 font-medium">{character.species}</p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Género</p>
                <p className="text-zinc-100 font-medium">{character.gender}</p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Tipo</p>
                <p className="text-zinc-100 font-medium">
                  {character.type || "—"}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Origen</p>
                <p className="text-zinc-100 font-medium">{character.origin.name}</p>
              </div>
              <div className="col-span-2">
                <p className="text-zinc-500 mb-1">Ubicación actual</p>
                <p className="text-zinc-100 font-medium">{character.location.name}</p>
              </div>
            </div>

            {/* Episodios */}
            <div>
              <p className="text-zinc-500 mb-3">Aparece en {character.episode.length} episodios</p>
              <div className="flex flex-wrap gap-2">
                {character.episode.slice(0, 12).map((ep, index) => (
                  <div
                    key={index}
                    className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400"
                  >
                    Ep. {ep.split("/").pop()}
                  </div>
                ))}
                {character.episode.length > 12 && (
                  <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-500">
                    +{character.episode.length - 12} más
                  </div>
                )}
              </div>
            </div>

            {/* Fecha de creación en la API */}
            <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-500">
              Creado en la API: {new Date(character.created).toLocaleDateString("es-ES")}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}