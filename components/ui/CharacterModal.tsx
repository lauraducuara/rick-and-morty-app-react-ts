"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors text-xs"
        >
          ✕
        </button>
        <div className="relative h-56 w-full">
          <Image
            src={c.image}
            alt={c.name}
            fill
            className="object-cover"
            sizes="400px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
          <div className="absolute bottom-3 left-4">
            <StatusBadge status={c.status} />
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-zinc-500 text-xs">
              #{c.id.toString().padStart(3, "0")}
            </p>
            <h2 className="text-xl font-bold text-white leading-tight mt-0.5">
              {c.name}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-0.5">Especie</p>
              <p className="text-zinc-100 text-sm font-medium">{c.species}</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-3">
              <p className="text-zinc-500 text-xs mb-0.5">Género</p>
              <p className="text-zinc-100 text-sm font-medium">{c.gender}</p>
            </div>
            <div className="bg-zinc-800 rounded-xl p-3 col-span-2">
              <p className="text-zinc-500 text-xs mb-0.5">Ubicación</p>
              <p className="text-zinc-100 text-sm font-medium truncate">{c.location.name}</p>
            </div>
          </div>

          <p className="text-zinc-500 text-xs text-center">
            Aparece en {c.episode.length} episodios
          </p>

          <Link
            href={`/character/${c.id}`}
            onClick={closeModal}
            className="
              block w-full text-center py-3 rounded-2xl
              bg-green-500 hover:bg-green-400
              text-zinc-900 font-semibold text-sm
              transition-colors
            "
          >
            Ver perfil completo →
          </Link>
        </div>
      </div>
    </div>
  );
}