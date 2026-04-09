import Link from "next/link";
import { Character } from "@/types/character";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link href={`/character/${character.id}`}>
      <article className="
        group bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden
        hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10
        transition-all duration-300 cursor-pointer
      ">
        <div className="relative overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={character.status} />
          </div>
        </div>

        <div className="p-4 space-y-1">
          <h2 className="font-semibold text-zinc-100 text-sm leading-tight line-clamp-1 group-hover:text-green-400 transition-colors">
            {character.name}
          </h2>
          <p className="text-zinc-500 text-xs">
            {character.species} · {character.gender}
          </p>
          <p className="text-zinc-600 text-xs truncate">
            {character.location.name}
          </p>
        </div>
      </article>
    </Link>
  );
}